package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/app")
@PreAuthorize("hasRole('USER')")
public class RequestIssueController {
    @Autowired
    private RequestService requestService;
    // Update a request (only if status is pending)
    @PutMapping("/requests/{requestId}")
    public ResponseEntity<?> updateRequest(@PathVariable Integer requestId, @RequestBody Request requestDetails) {
        Optional<Request> existingRequest = requestService.getRequestById(requestId);
        if (existingRequest.isPresent() && "pending".equals(existingRequest.get().getStatusRequest().name())) {
            requestDetails.setRequestId(requestId);
            Request updatedRequest = requestService.save(requestDetails);
            return ResponseEntity.ok(updatedRequest);
        } else if (existingRequest.isPresent()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only pending requests can be modified.");
        }
        return ResponseEntity.notFound().build();
    }
}
