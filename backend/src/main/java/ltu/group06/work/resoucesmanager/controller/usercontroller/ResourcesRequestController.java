package ltu.group06.work.resoucesmanager.controller.usercontroller;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
public class ResourcesRequestController {

    @Autowired
    private RequestService requestService;

    /**
     * Tạo yêu cầu (issue) sử dụng tài nguyên
     * @param request
     * @return
     */
    @PostMapping("/create-request")
    public ResponseEntity<Map<String, Object>> createRequest(@RequestBody Request request) {
        Request savedRequest = requestService.createRequest(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Yêu cầu đã được tạo thành công.");
        response.put("request_id", savedRequest.getRequestId());
        response.put("status_request", savedRequest.getStatusRequest());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

}
