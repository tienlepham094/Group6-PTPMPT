package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.entity.Allocation2;
import ltu.group06.work.resoucesmanager.service2.AllocationService2;
import ltu.group06.work.resoucesmanager.service2.UserResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/allocations")
public class AllocationController {

    @Autowired
    private AllocationService2 allocationService;

    @PostMapping
    public ResponseEntity<Allocation2> createAllocation(@RequestBody Allocation2 allocation) {
        Allocation2 createdAllocation = allocationService.createAllocation(allocation);
        return ResponseEntity.ok(createdAllocation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Allocation2> getAllocationById(@PathVariable Long id) {
        Optional<Allocation2> allocation = allocationService.getAllocationById(id);
        return allocation.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/resource/{resourceId}")
    public ResponseEntity<List<Allocation2>> getAllocationsByResourceId(@PathVariable Long resourceId) {
        List<Allocation2> allocations = allocationService.getAllocationsByResourceId(resourceId);
        return ResponseEntity.ok(allocations);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllocation(@PathVariable Long id) {
        allocationService.deleteAllocation(id);
        return ResponseEntity.noContent().build();
    }
}
