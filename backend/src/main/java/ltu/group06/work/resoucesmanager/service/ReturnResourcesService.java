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
    @Scheduled(fixedRate = 60000, initialDelay = 0) // Chạy mỗi phút một lần
    public void checkAndRecoverResources() {
        LocalDateTime now = LocalDateTime.now();
        System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Checking for resources due for recovery...");

        List<Allocation> allocationsNotDue = allocationRepository.findAllocationsNotDueForRecovery(LocalDateTime.now());
        System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Number of allocations not due for recovery: " + allocationsNotDue.size());

        List<Allocation> allocationsToRecover = allocationRepository.findAllocationsDueForRecovery(LocalDateTime.now());

        if (!allocationsToRecover.isEmpty()) {
            System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Number of allocations to recover: " + allocationsToRecover.size());
        } else {
            System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] No allocations to recover at this time.");
        }

        for (Allocation allocation : allocationsToRecover) {
            LocalDateTime releaseTime = allocation.getRequest().getEnd_time();
            System.out.println("Into for loop");
            if (!now.isBefore(allocation.getRequest().getEnd_time())) {
                System.out.println("Processing recovery for Resource ID " + allocation.getResource().getResourceId() + " from Request ID " + allocation.getRequest().getRequestId());

                Resource allocatedResource = allocation.getResource();
                int quantityToRecover = allocation.getAllocatedQuantity();

                Resource availableResource = resourceRepository.findAvailableResourceByType(allocatedResource.getResourceType());
                if (availableResource != null) {
                    // Tra lai so lượng tài nguyên đã cấp phát sau khi sd xong (+ số lượng tai nguyen co status = available)
                    availableResource.setQuantity(availableResource.getQuantity() + quantityToRecover);
                    resourceRepository.save(availableResource);
                }

                // Trừ đi gia tri so luong tai nguyen có stauts = allocated sau khi sd xong và phải tra lại tài nguyên
                allocatedResource.setQuantity(allocatedResource.getQuantity() - quantityToRecover);
                resourceRepository.save(allocatedResource);

                allocation.setReleasedAt(Timestamp.valueOf(now));
                allocationRepository.save(allocation);

                Request request = allocation.getRequest();
                request.setStatusRequest(Request.RequestStatus.completed);
                requestRepository.save(request);

                System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Resource ID " + allocatedResource.getResourceId() + " has been recovered and request marked as completed.");
            } else {
                System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Resource ID " + allocation.getResource().getResourceId() + " from Request ID " + allocation.getRequest().getRequestId() + " not yet due for recovery.");
                System.out.println("[" + now.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) + "] Resource ID " + allocation.getResource().getResourceId() +
                        " from Request ID " + allocation.getRequest().getRequestId() +
                        " is not due for recovery yet. Due in " + java.time.Duration.between(now, releaseTime).toMinutes() + " minutes.");
            }
        }
    }
}
