package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.repository.AllocationRepository;
import ltu.group06.work.resoucesmanager.repository.RequestRepository;
import ltu.group06.work.resoucesmanager.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReturnResourcesService {
    @Autowired
    private AllocationRepository allocationRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private RequestRepository requestRepository;

    @Transactional
    @Scheduled(fixedRate = 60000, initialDelay = 0) // Chạy mỗi phút 1 lâần
    public void checkAndRecoverResources() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Checking for resources due for recovery...");

        List<Allocation> allocationsToRecover = allocationRepository.findAllocationsDueForRecovery(LocalDateTime.now());
        System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Number of allocations to recover: " + allocationsToRecover.size());
        System.out.println("checkeded");
        for (Allocation allocation : allocationsToRecover) {
            LocalDateTime releaseTime = allocation.getRequest().getEnd_time();
            if (!now.isBefore(releaseTime)) {
                System.out.println("Processing recovery for Resource ID " + allocation.getResource().getResourceId() + " from Request ID " + allocation.getRequest().getRequestId());

                Resource resource = allocation.getResource();
                Request request = allocation.getRequest();

                resource.setQuantity(resource.getQuantity() + allocation.getAllocatedQuantity());
                resourceRepository.save(resource);

                allocation.setReleasedAt(Timestamp.valueOf(now));
                allocationRepository.save(allocation);

                request.setStatusRequest(Request.RequestStatus.completed);
                requestRepository.save(request);

                System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Resource ID " + resource.getResourceId() + " has been recovered and request marked as completed.");
            } else {
                System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Resource ID " + allocation.getResource().getResourceId() + " from Request ID " + allocation.getRequest().getRequestId() + " not yet due for recovery.");
            }
        }
    }
}
