package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.dto.AllocationRequest;
import ltu.group06.work.resoucesmanager.entity.UserResources;
import ltu.group06.work.resoucesmanager.service.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user/resources")
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

