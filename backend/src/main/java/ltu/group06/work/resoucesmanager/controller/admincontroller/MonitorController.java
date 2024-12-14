package ltu.group06.work.resoucesmanager.controller.admincontroller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import ltu.group06.work.resoucesmanager.service.MonitorService;

@RestController
@RequestMapping("/monitor")
@CrossOrigin(origins = "*")
public class MonitorController {
    private final MonitorService resourceMonitorService;

    public MonitorController(MonitorService resourceMonitorService) {
        this.resourceMonitorService = resourceMonitorService;
    }

    @GetMapping("/cpu-ram")
    public Map<String, Object> getCpuAndRamUsage() {
        Map<String, Object> response = new HashMap<>();
        response.put("cpu usage", resourceMonitorService.getCpuUsage());
        response.put("total memory", resourceMonitorService.getTotalMemory());
        response.put("percent of used memory", resourceMonitorService.getMemoryUsagePercent());
        response.put("metric", resourceMonitorService.getCpuMetrics());
        return response;
    }
}
