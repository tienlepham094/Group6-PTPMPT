package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.dto.ResourceAllocationRequest;
import ltu.group06.work.resoucesmanager.dto.ResourceReleaseRequest;
import ltu.group06.work.resoucesmanager.entity.Resource2;
import ltu.group06.work.resoucesmanager.service2.ResourceService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/auth/api/resources")
public class ResourceController2 {

    @Autowired
    private ResourceService2 resourceService;

    @PostMapping
    public ResponseEntity<Resource2> createResource(@RequestBody Resource2 resource) {
        Resource2 createdResource = resourceService.createResource(resource);
        return ResponseEntity.ok(createdResource);
    }

    @GetMapping
    public ResponseEntity<List<Resource2>> getAllResources() {
        List<Resource2> resources = resourceService.getAllResources();
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<List<Resource2>> getResourceByGroupId(@PathVariable Long id) {
        List<Resource2> resources = resourceService.getResourceByGroupId(id);
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource2> getResourceById(@PathVariable Long id) {
        Optional<Resource2> resource = resourceService.getResourceById(id);
        return resource.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
    // In ResourceController

    @PostMapping("/allocate")
    public ResponseEntity<String> allocateResource(@RequestBody ResourceAllocationRequest request) {
        boolean success = resourceService.allocateResource(request);

        if (success) {
            return ResponseEntity.ok("Resource allocated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to allocate resource.");
        }
    }

    @PostMapping("/release")
    public ResponseEntity<String> releaseResource(@RequestBody ResourceReleaseRequest request) {
        boolean success = resourceService.releaseResource(request);

        if (success) {
            return ResponseEntity.ok("Resource released successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to release resource.");
        }
    }



}
