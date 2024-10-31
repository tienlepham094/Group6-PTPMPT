package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.dto.RequestResourcesDto;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.LogService;
import ltu.group06.work.resoucesmanager.service.RequestService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
public class ResourcesRequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private LogService logService;
    /**
     * Tạo yêu cầu (issue) sử dụng tài nguyên
     * @param là 1 dto định sẵn
     * @return
     */
    @PostMapping("user/create-request")
    public ResponseEntity<Map<String, Object>> createRequest(@RequestBody RequestResourcesDto requestResourcesDto) {
        User user = userService.getUserById(requestResourcesDto.getUserId());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User not found"));
        }

        Request request = new Request();
        request.setUser(user);
        request.setResourceType(requestResourcesDto.getResourceType());
        request.setQuantity(requestResourcesDto.getQuantity());
        request.setReason(requestResourcesDto.getReason());
        request.setStatusRequest(Request.RequestStatus.pending);

        // Cho start time la thoi diem hien tai
        Timestamp startTime = Timestamp.from(Instant.now());
        request.setStartTime(startTime);

        // Kiem tra input cua end_time
        if (requestResourcesDto.getEndTimeHours() != null) {
            // Tinh end_time cho request dua tren thoi gian bat dau bang cach tinh start_time + so gio (input)
            request.setEnd_time(Timestamp.from(startTime.toInstant().plus(requestResourcesDto.getEndTimeHours(), ChronoUnit.HOURS)));
        } else if (requestResourcesDto.getEndTime() != null) {
            // Set time la thoi gian cu the voi kieu du lieu DATETIME
            request.setEnd_time(Timestamp.valueOf(requestResourcesDto.getEndTime()));
        } else {
            // Default neu khong co thoi gian ket thuc thi mac dinh la 24h sau thoi diem bat dau
            request.setEnd_time(Timestamp.from(startTime.toInstant().plus(24, ChronoUnit.HOURS)));
        }

        Request savedRequest = requestService.createRequest(request);

        logService.createLog(
                user.getUserId(),
                savedRequest.getRequestId(),
                "CREATE_REQUEST",
                "User created a request with resource type: " + savedRequest.getResourceType()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request created successfully");
        response.put("request_id", savedRequest.getRequestId());
        response.put("status_request", savedRequest.getStatusRequest());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Huy 1 issue request neu request dang o trang thai pending
    @PutMapping("user/cancel-request/{requestId}")
    public ResponseEntity<Map<String, Object>> cancelRequest(@PathVariable int requestId) {
        Optional<Request> optionalRequest = requestService.getRequestById(requestId);

        if (optionalRequest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Request not found"));
        }

        Request request = optionalRequest.get();

        // Kiem tra xem request co dang o trang thai pending hay khong thi moi' cho cancel
        if (request.getStatusRequest() != Request.RequestStatus.pending) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", "Only pending requests can be cancelled")
            );
        }

        // Cap nhat trang thai cua request sang cancelled
        request.setStatusRequest(Request.RequestStatus.cancelled);
        requestService.updateRequest(request);

        logService.createLog(
                request.getUser().getUserId(),
                request.getRequestId(),
                "CANCEL_REQUEST",
                "User cancelled request with ID: " + request.getRequestId()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request has been cancelled");
        response.put("request_id", request.getRequestId());
        response.put("status_request", request.getStatusRequest());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    /**
     * API để lấy danh sách các yêu cầu của một user
     * @param requestBody JSON body chứa user_id
     * @return Danh sách yêu cầu dưới dạng JSON
     */
    @PostMapping("/user/requests")
    public ResponseEntity<Map<String, Object>> getAllUserRequests(@RequestBody Map<String, Integer> requestBody) {
        Integer userId = requestBody.get("user_id");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", "User ID is required")
            );
        }

        List<Request> userRequests = requestService.getAllIssueRequestByUserId(userId);

        if (userRequests.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    Map.of("message", "No requests found for the given user")
            );
        }

        // Convert the List<Request> into the desired JSON structure
        List<Map<String, Object>> requestsList = userRequests.stream().map(request -> {
            Map<String, Object> requestMap = new HashMap<>();
            requestMap.put("requestId", request.getRequestId());
            requestMap.put("resourceType", request.getResourceType().name());
            requestMap.put("quantity", request.getQuantity());
            requestMap.put("startTime", request.getStartTime().toString());
            requestMap.put("end_time", request.getEnd_time().toString());
            requestMap.put("statusRequest", request.getStatusRequest().name());
            requestMap.put("reason", request.getReason());
            requestMap.put("createdAt", request.getCreatedAt().toString());
            requestMap.put("updatedAt", request.getUpdatedAt().toString());
            return requestMap;
        }).collect(Collectors.toList());

        // Build the final response
        Map<String, Object> response = new HashMap<>();
        response.put("user_id", userId);
        response.put("requests", requestsList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}