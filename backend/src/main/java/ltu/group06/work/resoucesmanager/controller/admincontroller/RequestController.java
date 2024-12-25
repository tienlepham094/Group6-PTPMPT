package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.dto.ResourceAllocationRequest;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.service.AllocationService;
import ltu.group06.work.resoucesmanager.service.RequestService;
import ltu.group06.work.resoucesmanager.service.ResourceService;
import ltu.group06.work.resoucesmanager.service.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private AllocationService allocationService;

    @Autowired
    private UserResourcesService userResourcesService;

    @Autowired
    private ResourceService resourceService;

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        Request createdRequest = requestService.createRequest(request);
        return ResponseEntity.ok(createdRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable Long id) {
        Optional<Request> request = requestService.getRequestById(id);
        return request.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get")
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRequestStatus(@PathVariable Long id, @RequestParam Request.Status status) {
        requestService.updateRequestStatus(id, status);

        if (status == Request.Status.APPROVED) {
            Optional<Request> requestOpt = requestService.getRequestById(id);
            if (requestOpt.isPresent()) {
                Request request = requestOpt.get();

                allocationService.createAllocation(new Allocation(
                        request,  // Pass the Request object here
                        request.getResourceId(),
                        request.getQuantity(),
                        request.getStartTime(),
                        request.getEndTime()
                ));


                // Cập nhật tài nguyên cho UserResources
                userResourcesService.allocateResource(request.getUserId(), request.getResourceType(), request.getQuantity());

                // Cập nhật tài nguyên cho Resource
                resourceService.allocateResource(new ResourceAllocationRequest(
                        request.getUserId(),
                        request.getResourceId(),
                        request.getQuantity()
                ));
            }
        }

        return ResponseEntity.noContent().build();
    }

}
