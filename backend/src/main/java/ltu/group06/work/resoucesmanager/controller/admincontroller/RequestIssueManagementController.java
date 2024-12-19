package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.RequestService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/app/admin")
public class RequestIssueManagementController {
    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    /**
     * Lay ra tất ca các issue request yêu cầu sử dụng tai nguyên của nguoi dùng
     * @param userId
     * @return
     */
    @GetMapping("/get/requests")
    public ResponseEntity<?> getAllRequests(@RequestParam(required = false) Integer userId) {
        try {
            if (!isAdmin(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
            }
            List<Request> requests = userId == null ? requestService.getAllRequests() : requestService.getAllRequestsByUserId(userId);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            // Return a generic error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing your request. Please try again later.");
        }
    }


    /**
     * Lay ra thong tin các request theo id
     * @param adminId
     * @param requestId
     * @return
     */
    @GetMapping("/get/requests/id/{requestId}")
    public ResponseEntity<?> getRequestById(@RequestParam Integer adminId, @PathVariable Integer requestId) {
        if (!isAdmin(adminId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }
        return requestService.getRequestById(requestId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Chinh sua thong tin request issue
     * @param adminId
     * @param requestId
     * @param requestDetails
     * @return
     */
//    @PutMapping("/edit/requests/{requestId}")
//    public ResponseEntity<?> updateRequest(@RequestParam Integer adminId, @PathVariable Integer requestId, @RequestBody Request requestDetails) {
//        if (!isAdmin(adminId)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
//        }
//        return requestService.updateRequest(requestId, requestDetails)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
    @PutMapping("/edit/requests/{requestId}")
    public ResponseEntity<?> updateRequest(
            @RequestParam Integer adminId,
            @PathVariable Integer requestId,
            @RequestBody Request requestDetails) {

        if (adminId == null || requestId == null) {
            return ResponseEntity.badRequest().body("Invalid parameters: adminId or requestId missing.");
        }

        if (!isAdmin(adminId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        return ResponseEntity.ok("ssss");
    }


    /**
     * Xoa request issue
     * @param adminId
     * @param requestId
     * @return
     */
    @DeleteMapping("/delete/requests/{requestId}")
    public ResponseEntity<?> deleteRequest(@RequestParam Integer adminId, @PathVariable Integer requestId) {
        if (!isAdmin(adminId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }
        requestService.deleteRequest(requestId);
        return ResponseEntity.ok().build();
    }

    private boolean isAdmin(Integer userId) {
        if (userId == null) {
            return false;  // Coi như không phải admin nếu không có userId
        }
        Optional<User> user = Optional.ofNullable(userService.getUserById(userId));
        return user.isPresent() && "ADMIN".equalsIgnoreCase(user.get().getRole());
    }
}
