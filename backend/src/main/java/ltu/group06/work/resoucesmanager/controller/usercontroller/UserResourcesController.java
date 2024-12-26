package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.dto.AllocationRequestDto;
import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.entity.UserResources;
import ltu.group06.work.resoucesmanager.service.UserResourcesService;
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
    public UserResources allocateResource(@RequestBody AllocationRequestDto allocationRequestDto) {
        return userResourcesService.allocateResource(
                allocationRequestDto.getUserId(),
                allocationRequestDto.getResourceType(),
                allocationRequestDto.getQuantity()
        );
    }

    // API để lấy tài nguyên của người dùng
    @GetMapping("/get")
    public UserResources getUserResources(@RequestParam Long userId, @RequestParam Resource.ResourceType resourceType) {
        return userResourcesService.getUserResources(userId, resourceType);
    }
    // API để lấy tất cả tài nguyên của một người dùng
    @GetMapping("/getAll")
    public List<UserResources> getAllUserResources(@RequestParam Long userId) {
        return userResourcesService.getAllUserResources(userId);
    }

    // API để giải phóng tài nguyên
    @PostMapping("/release")
    public UserResources releaseResource(@RequestBody AllocationRequestDto allocationRequestDto) {
        return userResourcesService.releaseResource(
                allocationRequestDto.getUserId(),
                allocationRequestDto.getResourceType(),
                allocationRequestDto.getQuantity()
        );
    }
}

