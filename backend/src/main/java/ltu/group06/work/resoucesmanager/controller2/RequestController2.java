package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.dto.ResourceAllocationRequest;
import ltu.group06.work.resoucesmanager.service2.AllocationService2;
import ltu.group06.work.resoucesmanager.service2.RequestService2;
import ltu.group06.work.resoucesmanager.service2.ResourceService2;
import ltu.group06.work.resoucesmanager.service.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth/api/requests")
public class RequestController2 {

    @Autowired
    private RequestService2 requestService;

    @Autowired
    private AllocationService2 allocationService;

    @Autowired
    private UserResourcesService userResourcesService;

    @Autowired
    private ResourceService2 resourceService;

    @PostMapping
    public ResponseEntity<Request2> createRequest(@RequestBody Request2 request) {
        Request2 createdRequest = requestService.createRequest(request);
        return ResponseEntity.ok(createdRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request2> getRequestById(@PathVariable Long id) {
        Optional<Request2> request = requestService.getRequestById(id);
        return request.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/get")
    public ResponseEntity<List<Request2>> getAllRequests() {
        List<Request2> requests = requestService.getAllRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request2>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request2> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRequestStatus(@PathVariable Long id, @RequestParam Request2.Status status) {
        requestService.updateRequestStatus(id, status);

        if (status == Request2.Status.APPROVED) {
            Optional<Request2> requestOpt = requestService.getRequestById(id);
            if (requestOpt.isPresent()) {
                Request2 request = requestOpt.get();

                allocationService.createAllocation(new Allocation2(
                        request.getUserId(),
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
