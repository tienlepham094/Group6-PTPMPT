package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.dto.AllocationRequest;
import ltu.group06.work.resoucesmanager.entity.Resource2;
import ltu.group06.work.resoucesmanager.entity.UserResources;
import ltu.group06.work.resoucesmanager.service2.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/api/user/resources")
public class UserResourcesController {

    @Autowired
    private UserResourcesService userResourcesService;

    // API để cấp phát tài nguyên
    @PostMapping("/allocate")
    public UserResources allocateResource(@RequestBody AllocationRequest allocationRequest) {
        return userResourcesService.allocateResource(
                allocationRequest.getUserId(),
                allocationRequest.getResourceType(),
                allocationRequest.getQuantity()
        );
    }

    // API để lấy tài nguyên của người dùng
    @GetMapping("/get")
    public UserResources getUserResources(@RequestParam Long userId, @RequestParam Resource2.ResourceType resourceType) {
        return userResourcesService.getUserResources(userId, resourceType);
    }
    // API để lấy tất cả tài nguyên của một người dùng
    @GetMapping("/getAll")
    public List<UserResources> getAllUserResources(@RequestParam Long userId) {
        return userResourcesService.getAllUserResources(userId);
    }

    // API để giải phóng tài nguyên
    @PostMapping("/release")
    public UserResources releaseResource(@RequestBody AllocationRequest allocationRequest) {
        return userResourcesService.releaseResource(
                allocationRequest.getUserId(),
                allocationRequest.getResourceType(),
                allocationRequest.getQuantity()
        );
    }
}

