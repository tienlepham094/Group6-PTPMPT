package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Log;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.LogService;
import ltu.group06.work.resoucesmanager.service.ResourceService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/app/admin")
@CrossOrigin(origins = "*")
public class ResourceHistoryController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private LogService logService;

    // Check ADMIN, chỉ có admin mới có quyền xem lịch sử sử dụng tài nguyên
    private boolean isAdmin(int userId) {
        Optional<User> user = Optional.ofNullable(userService.getUserById(userId));
        return user.isPresent() && "ADMIN".equalsIgnoreCase(user.get().getRole());
    }

    /**
     * Xem tất cả các resource cũng như trạng thái của chúng có trong hệ thống
     *
     * @return
     */
    @GetMapping("/resource/get/all")
    public ResponseEntity<?> getResourceStatus() {
        List<Resource> resources = resourceService.getAllResources();
        List<Map<String, Object>> resourceStatusList = new ArrayList<>();

        for (Resource resource : resources) {
            Map<String, Object> resourceStatus = new HashMap<>();
            resourceStatus.put("resource_type", resource.getResourceType());
            resourceStatus.put("totalQuantity", resource.getQuantity());
            resourceStatus.put("status", resource.getStatusResources());

            resourceStatusList.add(resourceStatus);
        }

        return ResponseEntity.ok(resourceStatusList);
    }

    /**
     * Xem lịch sử sử dụng tài nguyên của các user
     *
     * @param userId
     * @return
     */
    @GetMapping("/resource/usage/history")
    public ResponseEntity<?> getResourceUsageHistory(@RequestHeader("userId") Integer adminId, @RequestParam("targetUserId") Integer targetUserId) {
        // Check if the user is an admin
        if (!userService.isAdmin(adminId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Access denied. Only admins can perform this action."));
        }

        // Fetch the logs that correspond to APPROVE_REQUEST for the target user
        List<Log> logs = logService.findLogsByActionAndUserId("APPROVE_REQUEST", targetUserId);
        List<Map<String, Object>> usageHistory = new ArrayList<>();

        for (Log log : logs) {
            Optional<Request> requestOpt = resourceService.getRequestById(log.getRequestId());
            requestOpt.ifPresent(request -> {
                Map<String, Object> record = new HashMap<>();
                record.put("request_id", request.getRequestId());
                record.put("created_at", request.getCreatedAt().toString());
                record.put("start_time", request.getStartTime() != null ? request.getStartTime().toString() : "Not set");
                record.put("end_time", request.getEnd_time() != null ? request.getEnd_time().toString() : "Not set");
                record.put("quantity", request.getQuantity());
                record.put("resource_type", request.getResourceType());
                record.put("reason", request.getReason());
                record.put("status", request.getStatusRequest());
                usageHistory.add(record);
            });
        }

        if (usageHistory.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "No usage history found for the specified user"));
        }

        return ResponseEntity.ok(Map.of("usageHistory", usageHistory));
    }

    /**
     * Ham cu, dang bi loi
     * @param userId
     * @return
     */
    @GetMapping("/resource/usage/history")
    public ResponseEntity<?> getResourceUsageHistory(@RequestParam int userId) {

        if (!isAdmin(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        List<Log> resourceUsageLogs = logService.getAllLogs();

        Map<String, Object> response = new HashMap<>();
        response.put("resourceUsageLogs", resourceUsageLogs);

        return ResponseEntity.ok(response);
    }
}
