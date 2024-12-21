package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.entity.Request2;
import ltu.group06.work.resoucesmanager.service2.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Request2>> getRequestsByUserId(@PathVariable Long userId) {
        List<Request2> requests = requestService.getRequestsByUserId(userId);
        return ResponseEntity.ok(requests);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateRequestStatus(@PathVariable Long id, @RequestParam Request2.Status status) {
        requestService.updateRequestStatus(id, status);
        return ResponseEntity.noContent().build();
    }
}
