package ltu.group06.work.resoucesmanager.scheduler;

import ltu.group06.work.resoucesmanager.dto.ResourceReleaseRequest;
import ltu.group06.work.resoucesmanager.entity.Allocation2;
import ltu.group06.work.resoucesmanager.service2.AllocationService2;
import ltu.group06.work.resoucesmanager.service2.ResourceService2;
import ltu.group06.work.resoucesmanager.service2.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AllocationExpirationTask {

    @Autowired
    private AllocationService2 allocationService;

    @Autowired
    private UserResourcesService userResourcesService;

    @Autowired
    private ResourceService2 resourceService;

    @Scheduled(fixedRate = 60000) // Chạy mỗi phút
    public void checkAndReleaseExpiredAllocations() {
        List<Allocation2> expiredAllocations = allocationService.getExpiredAllocations();

        for (Allocation2 allocation : expiredAllocations) {
            // Giải phóng tài nguyên ở UserResources
            userResourcesService.releaseResource(allocation.getUserId(), allocation.getResourceType(), allocation.getQuantity());

            // Giải phóng tài nguyên ở Resource
            resourceService.releaseResource(new ResourceReleaseRequest(
                    allocation.getResource().getId(),
                    allocation.getQuantity()
            ));

            // Xóa Allocation
            allocationService.deleteAllocation(allocation.getId());
        }
    }
}

