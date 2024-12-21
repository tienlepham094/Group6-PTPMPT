package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.service.RequestService;
import ltu.group06.work.resoucesmanager.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/app/admin")
@CrossOrigin(origins = "*")
public class GetInfoResourcesController {
    @Autowired
    private ResourceService resourceService;

    @Autowired
    private RequestService requestService;

    /**
     * Lấy ra tất cả các tài nguyên có sẵn trong hệ thống
     * @return
     */
    @GetMapping("/get/available-resources")
    public ResponseEntity<Map<String, Object>> getAllResources() {
        List<Resource> resources = resourceService.getAllResources();

        List<Map<String, Object>> resourcesList = resources.stream().map(resource -> {
            Map<String, Object> resourceMap = new HashMap<>();
            resourceMap.put("resource_id", resource.getResourceId());
            resourceMap.put("resource_type", resource.getResourceType().name());
            resourceMap.put("quantity", resource.getQuantity());
            resourceMap.put("status_resources", resource.getStatusResources().name());
            return resourceMap;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("resources", resourcesList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
