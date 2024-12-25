package ltu.group06.work.resoucesmanager.scheduler;

import ltu.group06.work.resoucesmanager.dto.ResourceReleaseRequest;
import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.service.AllocationService;
import ltu.group06.work.resoucesmanager.service.ResourceService;
import ltu.group06.work.resoucesmanager.service.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AllocationExpirationTask {

    @Autowired
    private AllocationService allocationService;

    @Autowired
    private UserResourcesService userResourcesService;

    @Autowired
    private ResourceService resourceService;

    @Scheduled(fixedRate = 60000) // Chạy mỗi phút
    public void checkAndReleaseExpiredAllocations() {
        List<Allocation> expiredAllocations = allocationService.getExpiredAllocations();

        for (Allocation Allocation : expiredAllocations) {
            // Giải phóng tài nguyên ở UserResources
            userResourcesService.releaseResource(Allocation.getUserId(), Allocation.getResourceType(), Allocation.getQuantity());

            // Giải phóng tài nguyên ở Resource
            resourceService.releaseResource(new ResourceReleaseRequest(
                    Allocation.getResource().getId(),
                    Allocation.getQuantity()
            ));

            // Xóa Allocation
            allocationService.deleteAllocation(Allocation.getId());
        }
    }
}

