package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/app")
@PreAuthorize("hasRole('user')")
public class RequestIssueController {
    @Autowired
    private RequestService requestService;

    /**
     * API update request của user voi dieu kien request phai la pending
     *
     * @param requestId      (param requestId)
     * @param requestDetails (body)
     *                       {
     *                       "resourceType": "GPU",
     *                       "quantity": 2,
     *                       "reason": "Need more GPUs for computation",
     *                       "timeUsage": 4
     *                       }
     * @return
     */
    @PutMapping("user/update/request")
    public ResponseEntity<?> updateRequest(@RequestParam Integer requestId, @RequestBody Request requestDetails) {
        Optional<Request> existingRequestOpt = requestService.getRequestById(requestId);

        if (!existingRequestOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Request not found", "requestId", requestId));
        }

        Request existingRequest = existingRequestOpt.get();

        if (!"pending".equals(existingRequest.getStatus().name())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Only pending requests can be modified.", "requestId", requestId));
        }

//        existingRequest.setResourceType(requestDetails.getResourceType());
        existingRequest.setQuantity(requestDetails.getQuantity());
        existingRequest.setStartTime(requestDetails.getStartTime());
        existingRequest.setStartTime(requestDetails.getEndTime());

        existingRequest.setCreatedAt(new Timestamp(System.currentTimeMillis()).toLocalDateTime());

        Request updatedRequest = requestService.save(existingRequest);

        return ResponseEntity.ok(Map.of("message", "Request updated successfully", "requestId", updatedRequest.getId(), "status", updatedRequest.getStatus()));
    }
}
