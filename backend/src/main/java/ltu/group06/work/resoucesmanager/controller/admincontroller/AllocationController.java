package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    @Autowired
    private AllocationService allocationService;

    @PostMapping
    public ResponseEntity<Allocation> createAllocation(@RequestBody Allocation allocation) {
        Allocation createdAllocation = allocationService.createAllocation(allocation);
        return ResponseEntity.ok(createdAllocation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Allocation> getAllocationById(@PathVariable Long id) {
        Optional<Allocation> allocation = allocationService.getAllocationById(id);
        return allocation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/resource/{resourceId}")
    public ResponseEntity<List<Allocation>> getAllocationsByResourceId(@PathVariable Long resourceId) {
        List<Allocation> allocations = allocationService.getAllocationsByResourceId(resourceId);
        return ResponseEntity.ok(allocations);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
        return ResponseEntity.noContent().build();
    }
}
