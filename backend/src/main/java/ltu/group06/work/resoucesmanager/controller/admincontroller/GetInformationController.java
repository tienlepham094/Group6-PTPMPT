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
public class GetInformationController {
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
    /**
     * Lay ra tất ca các issue request yêu cầu sử dụng tai nguyên của nguoi dùng
     */
    @GetMapping("/get/requests-issue")
    public ResponseEntity<Map<String, Object>> getAllUserRequests() {
        List<Request> userRequests = requestService.getAllRequests();

        // Convert requests to a list of maps for JSON response
        List<Map<String, Object>> requestsList = userRequests.stream().map(request -> {
            Map<String, Object> requestMap = new HashMap<>();
            requestMap.put("request_id", request.getRequestId());
            requestMap.put("user_id", request.getUser().getUserId());
            requestMap.put("resource_type", request.getResourceType().name());
            requestMap.put("quantity", request.getQuantity());
            requestMap.put("start_time", request.getStartTime().toString());
            requestMap.put("end_time", request.getEnd_time().toString());
            requestMap.put("status_request", request.getStatusRequest().name());
            requestMap.put("reason", request.getReason());
            requestMap.put("created_at", request.getCreatedAt().toString());
            requestMap.put("updated_at", request.getUpdatedAt().toString());
            return requestMap;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("requests", requestsList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
