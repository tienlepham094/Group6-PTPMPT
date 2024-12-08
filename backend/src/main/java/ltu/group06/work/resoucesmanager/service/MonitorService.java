package ltu.group06.work.resoucesmanager.service;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;

import java.util.HashMap;
import java.util.Map;

@Service
public class MonitorService {
    private final SystemInfo systemInfo;

    public MonitorService() {
        this.systemInfo = new SystemInfo();
    }

    public double getCpuUsage() {
        CentralProcessor processor = systemInfo.getHardware().getProcessor();
        return processor.getSystemCpuLoad(5) * 100; // % CPU usage
    }

    public long getTotalMemory() {
        GlobalMemory memory = systemInfo.getHardware().getMemory();
        return memory.getTotal() / (1024 * 1024 * 1024); // Convert to GB
    }
    public Map<String, Object> getCpuMetrics() {
        CentralProcessor processor = systemInfo.getHardware().getProcessor();
        Map<String, Object> cpuMetrics = new HashMap<>();
        cpuMetrics.put("physicalCores", processor.getPhysicalProcessorCount());
        cpuMetrics.put("logicalProcessors", processor.getLogicalProcessorCount());
        cpuMetrics.put("cpuFrequencyMHz", processor.getProcessorIdentifier().getVendorFreq() / 1_000_000);
        return cpuMetrics;
    }
    public double getMemoryUsagePercent() {
        GlobalMemory memory = systemInfo.getHardware().getMemory();
        long totalMemory = memory.getTotal();
        long usedMemory = totalMemory - memory.getAvailable();
        return ((double) usedMemory / totalMemory) * 100; // % memory usage
    }
}
