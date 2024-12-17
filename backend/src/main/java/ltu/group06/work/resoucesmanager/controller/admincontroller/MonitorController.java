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

    @GetMapping("/metrics")
    public Map<String, Object> getCpuAndRamUsage() {
        Map<String, Object> metrics = new HashMap<>();

        // Collect all metrics
        metrics.put("cpuMetrics", resourceMonitorService.getCpuMetrics());
        metrics.put("memoryMetrics", resourceMonitorService.getMemoryMetrics());
        metrics.put("diskMetrics", resourceMonitorService.getDiskMetrics());
        metrics.put("networkTraffic", resourceMonitorService.getNetworkTraffic());
        return metrics;
    }
}
