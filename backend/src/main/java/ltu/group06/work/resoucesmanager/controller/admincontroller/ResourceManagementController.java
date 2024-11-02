package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.ResourceService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/app/admin/resource")
@CrossOrigin(origins = "*")
public class ResourceManagementController {

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private UserService userService;

    // Kiểm tra xem user có phải admin hay không
    private boolean isAdmin(int userId) {
        User user = userService.getUserById(userId);
        return user != null && "ADMIN".equalsIgnoreCase(user.getRole());
    }

    // API thêm tài nguyên hoặc cập nhật số lượng nếu đã tồn tại
    @PostMapping("/add")
    public ResponseEntity<?> addOrUpdateResource(@RequestBody Map<String, Object> resourceData) {
        int userId = (int) resourceData.get("userId");

        if (!isAdmin(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        Resource.ResourceType resourceType = Resource.ResourceType.valueOf((String) resourceData.get("resourceType"));
        Resource.ResourceStatus statusResources = Resource.ResourceStatus.valueOf((String) resourceData.get("statusResources"));
        int quantity = (int) resourceData.get("quantity");

        Optional<Resource> optionalResource = resourceService.findByResourceTypeAndStatus(resourceType, statusResources);

        Resource resource;
        if (optionalResource.isPresent()) {
            resource = optionalResource.get();
            resource.setQuantity(resource.getQuantity() + quantity); // Cộng dồn số lượng
        } else {
            resource = new Resource();
            resource.setResourceType(resourceType);
            resource.setStatusResources(statusResources);
            resource.setQuantity(quantity);
            resource.setCreatedAt(Timestamp.from(Instant.now()));
            resource.setUpdatedAt(Timestamp.from(Instant.now()));
        }

        resourceService.updateResource(resource);
        return ResponseEntity.status(HttpStatus.CREATED).body("Resource added/updated successfully.");
    }

    // API cập nhật số lượng tài nguyên (giảm hoặc tăng dựa vào input)
    @PutMapping("/update")
    public ResponseEntity<?> updateResourceQuantity(@RequestBody Map<String, Object> resourceData) {
        int userId = (int) resourceData.get("userId");

        if (!isAdmin(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        Resource.ResourceType resourceType = Resource.ResourceType.valueOf((String) resourceData.get("resourceType"));
        Resource.ResourceStatus statusResources = Resource.ResourceStatus.valueOf((String) resourceData.get("statusResources"));
        int quantity = (int) resourceData.get("quantity");

        Optional<Resource> optionalResource = resourceService.findByResourceTypeAndStatus(resourceType, statusResources);

        if (optionalResource.isPresent()) {
            Resource resource = optionalResource.get();
            int newQuantity = resource.getQuantity() + quantity;
            resource.setQuantity(newQuantity < 0 ? 0 : newQuantity); // Đảm bảo không dưới 0
            resource.setUpdatedAt(Timestamp.from(Instant.now()));
            resourceService.updateResource(resource);
            return ResponseEntity.ok("Resource quantity updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found.");
        }
    }

    // API xóa tài nguyên với tùy chọn đặt số lượng về 0 khi quantity = -1
    @PostMapping("/delete")
    public ResponseEntity<?> deleteResource(@RequestBody Map<String, Object> resourceData) {
        int userId = (int) resourceData.get("userId");

        if (!isAdmin(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied. Only admin can perform this action.");
        }

        Resource.ResourceType resourceType = Resource.ResourceType.valueOf((String) resourceData.get("resourceType"));
        Resource.ResourceStatus statusResources = Resource.ResourceStatus.valueOf((String) resourceData.get("statusResources"));
        int quantityToDelete = (int) resourceData.get("quantity");

        Optional<Resource> optionalResource = resourceService.findByResourceTypeAndStatus(resourceType, statusResources);

        if (optionalResource.isPresent()) {
            Resource resource = optionalResource.get();

            if (quantityToDelete == -1) {
                // Đặt số lượng về 0 nếu quantity = -1
                resource.setQuantity(0);
            } else {
                // Giảm số lượng tài nguyên nếu quantity không phải là -1
                int newQuantity = resource.getQuantity() - quantityToDelete;
                resource.setQuantity(Math.max(newQuantity, 0)); // Đảm bảo không âm
            }

            resource.setUpdatedAt(Timestamp.from(Instant.now()));
            resourceService.updateResource(resource);

            return ResponseEntity.ok("Resource quantity reduced/deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found.");
        }
    }
}
