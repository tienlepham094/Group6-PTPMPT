//package ltu.group06.work.resoucesmanager.controller.admincontroller;
//
//import ltu.group06.work.resoucesmanager.entity.Resource;
//import ltu.group06.work.resoucesmanager.entity.User;
//import ltu.group06.work.resoucesmanager.service.LogService;
//import ltu.group06.work.resoucesmanager.service.ResourceService;
//import ltu.group06.work.resoucesmanager.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.Timestamp;
//import java.time.Instant;
//import java.util.Map;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/app/admin/resource")
//@CrossOrigin(origins = "*")
//public class ResourceManagementController {
//
//    @Autowired
//    private ResourceService resourceService;
//
//    @Autowired
//    private UserService userService;
//
//    @Autowired
//    private LogService logService;
//
//    // Kiểm tra xem user có phải admin hay không
//    private boolean isAdmin(int userId) {
//        User user = userService.getUserById(userId);
//        return user != null && "ADMIN".equalsIgnoreCase(String.valueOf(user.getRole()));
//    }
//
//    // API thêm tài nguyên hoặc cập nhật số lượng nếu đã tồn tại
//    @PostMapping("/add")
//    public ResponseEntity<?> addOrUpdateResource(@RequestBody Map<String, Object> resourceData) {
//        int userId = (int) resourceData.get("userId");
//
//        if (!isAdmin(userId)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
//        }
//
//        Resource.ResourceType resourceType = Resource.ResourceType.valueOf((String) resourceData.get("resourceType"));
//        Resource.ResourceType statusResources = Resource.ResourceType.valueOf((String) resourceData.get("statusResources"));
//        int quantity = (int) resourceData.get("quantity");
//
//        Optional<Resource> optionalResource = resourceService.findByResourceTypeAndStatus(resourceType, statusResources);
//
//        Resource resource;
//
//        // Kiểm tra nếu như là tài nguyên có sẵn trong db hay không
//        if (optionalResource.isPresent()) {
//            resource = optionalResource.get();
//            int oldQuantity = resource.getQuantity();
//            resource.setQuantity(resource.getQuantity() + quantity);
//            resource.setUpdatedAt(Timestamp.from(Instant.now()));
//            // Log với các tài nguyeen đã có sẵn và được cộng thêm vào
//            logService.createLog(
//                    userId,
//                    null,
//                    "UPDATE_RESOURCE",
//                    "Updated resource quantity for " + resourceType + " with status " + statusResources +
//                            " from " + oldQuantity + " to " + resource.getQuantity()
//            );
//            // Nếu đây là 1 loại tài nguyên mới chưa có trong db, thì sẽ tạo mới thông qua API add số lượng này
//        } else {
//            resource = new Resource();
//            resource.setResourceType(resourceType);
//            resource.setStatusResources(statusResources);
//            resource.setQuantity(quantity);
//            resource.setCreatedAt(Timestamp.from(Instant.now()));
//            resource.setUpdatedAt(Timestamp.from(Instant.now()));
//            // Log tạo tài nguyên mới
//            resourceService.updateResource(resource);
//            logService.createLog(
//                    userId,
//                    null,
//                    "CREATE_RESOURCE",
//                    "Created new resource of type " + resourceType + " with status " + statusResources +
//                            " and quantity " + quantity
//            );
//        }
//
//        resourceService.updateResource(resource);
//        return ResponseEntity.status(HttpStatus.CREATED).body("Resource added/updated successfully.");
//    }
//
//    /**
//     * API cập nhật số lượng tài nguyên
//     * @param resourceData
//     * @return
//     */
//    @PutMapping("/update")
//    public ResponseEntity<?> updateOrDeleteResource(@RequestBody Map<String, Object> resourceData) {
//        int userId = (int) resourceData.get("userId");
//
//        if (!isAdmin(userId)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
//        }
//
//        Resource.ResourceType resourceType = Resource.ResourceType.valueOf((String) resourceData.get("resourceType"));
//        Resource.ResourceType statusResources = Resource.ResourceType.valueOf((String) resourceData.get("statusResources"));
//        int quantity = (int) resourceData.get("quantity");
//
//        Optional<Resource> optionalResource = resourceService.findByResourceTypeAndStatus(resourceType, statusResources);
//        if (optionalResource.isPresent()) {
//            Resource resource = optionalResource.get();
//            int oldQuantity = resource.getQuantity();
//
//            if (quantity == 0) {
//                // Nếu quantity là 0, đặt số lượng về 0
//                resource.setQuantity(0);
//                String action = quantity < 0 ? "DECREASE_RESOURCE" : "INCREASE_RESOURCE";
//                logService.createLog(
//                        userId,
//                        null,
//                        action,
//                        "Updated resource quantity for " + resourceType + " with status " + statusResources + " from " + oldQuantity + " to " + resource.getQuantity()
//                );
//            } else {
//                // Nếu quantity khác -1, cập nhật số lượng
//                int newQuantity = resource.getQuantity() + quantity;
//                resource.setQuantity(Math.max(newQuantity, 0)); // Đảm bảo không dưới 0
//
//                String action = quantity < 0 ? "DECREASE_RESOURCE" : "INCREASE_RESOURCE";
//                logService.createLog(
//                        userId,
//                        null,
//                        action,
//                        "Updated resource quantity for " + resourceType + " with status " + statusResources + " from " + oldQuantity + " to " + resource.getQuantity()
//                );
//            }
//
//            resource.setUpdatedAt(Timestamp.from(Instant.now()));
//            resourceService.updateResource(resource);
//
//            return ResponseEntity.ok("Resource updated successfully.");
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found.");
//        }
//    }
//}
