package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.dto.RequestResourcesDto;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.TelegramUser;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.LogService;
import ltu.group06.work.resoucesmanager.service.RequestService;
import ltu.group06.work.resoucesmanager.service.TelegramUserService;
import ltu.group06.work.resoucesmanager.service.UserService;
import ltu.group06.work.resoucesmanager.telegrambot.TelegramBotService;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static ltu.group06.work.resoucesmanager.controller.AppTestController.getsR;

@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
public class ResourcesRequestController {
    @Autowired
    private TelegramUserService telegramUserService;

    @Autowired
    private TelegramBotService telegramBotService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private LogService logService;

    /**
     * Tạo yêu cầu (issue) sử dụng tài nguyên
     *
     * @param
     * @return
     */
    @PostMapping("user/create-request")
    public ResponseEntity<Map<String, Object>> createRequest(@RequestBody RequestResourcesDto requestResourcesDto) {
        User user = userService.getUserById(requestResourcesDto.getUser_id());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User not found"));
        }

        Request request = new Request();
        request.setUser(user);
        request.setQuantity(requestResourcesDto.getQuantity());
        request.setStatus(request.getStatus());

        // Thiết lập `startTime` với thời gian hiện tại
        LocalDateTime startTime = LocalDateTime.now();
        System.out.println("New request created at: " + startTime);
        request.setCreatedAt(startTime);

        Request savedRequest = requestService.createRequest(request);

        logService.createLog(
                Math.toIntExact(user.getId()),
                null,
                "CREATE_REQUEST",
                "User created a request with resource type: " + savedRequest.getResourceType()
        );

        // Gửi thông báo Telegram
        TelegramUser telegramUser = telegramUserService.getTelegramUserByUserId((long) Math.toIntExact(user.getId()));
        if (telegramUser != null) {
            telegramBotService.sendMessageToUser(
                    telegramUser.getTelegramId(),
                    "Bạn vừa tạo một yêu cầu mới với loại tài nguyên: " +
                            requestResourcesDto.getResource_type() +
                            ". Yêu cầu của bạn đang chờ phê duyệt."
            );
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request created successfully");
        response.put("request_id", savedRequest.getId());
        response.put("status_request", savedRequest.getStatus());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Huy 1 issue request neu request dang o trang thai pending
    @PutMapping("user/cancel-request")
    public ResponseEntity<Map<String, Object>> cancelRequest(@RequestHeader("userId") Long userId, @RequestParam("requestId") int requestId) {
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User ID header is required"));
        }

        Optional<Request> optionalRequest = requestService.getRequestById(requestId);

        if (optionalRequest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Request not found"));
        }

        Request request = optionalRequest.get();

        if (request.getUser().getId() != (userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    Map.of("error", "You can only cancel your own requests")
            );
        }

        // Check if the request is in pending state
        if (request.getStatus() != Request.Status.PENDING) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", "Only pending requests can be cancelled")
            );
        }

        // Update the status of the request to cancelled
        request.setStatus(Request.Status.CANCELLED);
        requestService.updateRequest(request);

        // Log the cancellation
        logService.createLog(
                Math.toIntExact(userId),
                Math.toIntExact(request.getId()),
                "CANCEL_REQUEST",
                "User cancelled request with ID: " + request.getId()
        );

        // Send Telegram notification if applicable
        TelegramUser telegramUser = telegramUserService.getTelegramUserByUserId((long) Math.toIntExact(userId));
        if (telegramUser != null) {
            telegramBotService.sendMessageToUser(
                    telegramUser.getTelegramId(),
                    "Yêu cầu của bạn với ID: " + requestId + " đã bị hủy."
            );
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Request has been cancelled");
        response.put("request_id", request.getId());
        response.put("status_request", request.getStatus());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    /**
     * API để lấy danh sách các yêu cầu của một user
     *
     * @param userId ID của user
     * @return Danh sách yêu cầu dưới dạng JSON
     */
    @GetMapping("/user/requests")
    public ResponseEntity<Map<String, Object>> getAllUserRequests(@RequestParam Integer userId) {

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
            requestMap.put("request_id", request.getId());
            requestMap.put("user_id", request.getUser().getId());
            requestMap.put("resource_type", request.getResourceType().name());
            requestMap.put("quantity", request.getQuantity());
            requestMap.put("start_time", request.getStartTime() != null ? request.getStartTime().toString() : "The time has not yet been set");
            requestMap.put("end_time", request.getEndTime() != null ? request.getEndTime().toString() : "The time has not yet been set");
            requestMap.put("status_request", request.getStatus().name());
            requestMap.put("created_at", request.getCreatedAt().toString());
            return requestMap;
        }).collect(Collectors.toList());

        // Build the final response
        Map<String, Object> response = new HashMap<>();
        response.put("user_id", userId);
        response.put("requests", requestsList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


}
