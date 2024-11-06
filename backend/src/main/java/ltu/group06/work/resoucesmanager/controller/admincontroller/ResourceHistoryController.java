package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Log;
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

    // Kiểm tra xem user có phải admin hay không
    private boolean isAdmin(int userId) {
        Optional<User> user = Optional.ofNullable(userService.getUserById(userId));
        return user.isPresent() && "ADMIN".equalsIgnoreCase(user.get().getRole());
    }

    /**
     * Xem tất cả các resource cũng như trạng thái của chúng có trong hệ thống
     * @return
     */
    @GetMapping("/resource/get/all")
    public ResponseEntity<?> getResourceStatus() {
        List<Resource> resources = resourceService.getAllResources();
        List<Map<String, Object>> resourceStatusList = new ArrayList<>();

        for (Resource resource : resources) {
            Map<String, Object> resourceStatus = new HashMap<>();
            resourceStatus.put("resourceType", resource.getResourceType());
            resourceStatus.put("totalQuantity", resource.getQuantity());
            resourceStatus.put("status", resource.getStatusResources());

            resourceStatusList.add(resourceStatus);
        }

        return ResponseEntity.ok(resourceStatusList);
    }

    /**
     * Xem lịch sử sử dụng tài nguyên của các user
      * @param requestBody
     * @return
     */
    @PostMapping("/resource/usage/history")
    public ResponseEntity<?> getResourceUsageHistory(@RequestBody Map<String, Integer> requestBody) {
        int userId = requestBody.get("userId");

        if (!isAdmin(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        // Lấy toàn bộ log lịch sử sử dụng tài nguyên, bao gồm cả user_id đã thực hiện thao tác
        List<Log> resourceUsageLogs = logService.getAllLogs();

        // Tạo response để trả về lịch sử và tình trạng hiện tại của tài nguyên
        Map<String, Object> response = new HashMap<>();
        response.put("resourceUsageLogs", resourceUsageLogs);

        return ResponseEntity.ok(response);
    }
}
