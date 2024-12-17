package ltu.group06.work.resoucesmanager.service;
import ltu.group06.work.resoucesmanager.entity.TelegramUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.hardware.NetworkIF;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MonitorService {
    @Autowired
    private TelegramUserService telegramUserService;
    @Autowired
    private UserService userService;

    private final SystemInfo systemInfo;
//    private TelegramUser telegramUser = telegramUserService.getTelegramUserByUserId(user.getUserId());
    private final String telegramBotToken = System.getenv("TELEGRAM_TOKEN");
    public MonitorService() {
        this.systemInfo = new SystemInfo();
    }

    // CPU Metrics
    public Map<String, Object> getCpuMetrics() {
        CentralProcessor processor = systemInfo.getHardware().getProcessor();
        Map<String, Object> cpuMetrics = new HashMap<>();
        cpuMetrics.put("cpuUsagePercent", processor.getSystemCpuLoad(1) * 100);
        cpuMetrics.put("physicalCores", processor.getPhysicalProcessorCount());
        cpuMetrics.put("logicalProcessors", processor.getLogicalProcessorCount());
        cpuMetrics.put("cpuFrequencyMHz", processor.getProcessorIdentifier().getVendorFreq() / 1_000_000);
        return cpuMetrics;
    }

    // Memory Metrics
    public Map<String, Object> getMemoryMetrics() {
        GlobalMemory memory = systemInfo.getHardware().getMemory();
        long totalMemory = memory.getTotal();
        long availableMemory = memory.getAvailable();
        long usedMemory = totalMemory - availableMemory;

        Map<String, Object> memoryMetrics = new HashMap<>();
        memoryMetrics.put("totalMemoryGB", totalMemory / (1024 * 1024 * 1024));
        memoryMetrics.put("availableMemoryGB", availableMemory / (1024 * 1024 * 1024));
        memoryMetrics.put("usedMemoryGB", usedMemory / (1024 * 1024 * 1024));
        memoryMetrics.put("memoryUsagePercent", ((double) usedMemory / totalMemory) * 100);
        return memoryMetrics;
    }

    // Disk Metrics
    public Map<String, Object> getDiskMetrics() {
        FileSystem fileSystem = systemInfo.getOperatingSystem().getFileSystem();
        OSFileStore[] fileStores = fileSystem.getFileStores().toArray(new OSFileStore[0]);
        long totalSpace = 0;
        long usableSpace = 0;

        for (OSFileStore fs : fileStores) {
            totalSpace += fs.getTotalSpace();
            usableSpace += fs.getUsableSpace();
        }

        long usedSpace = totalSpace - usableSpace;

        Map<String, Object> diskMetrics = new HashMap<>();
        diskMetrics.put("totalDiskSpaceGB", totalSpace / (1024 * 1024 * 1024));
        diskMetrics.put("usedDiskSpaceGB", usedSpace / (1024 * 1024 * 1024));
        diskMetrics.put("freeDiskSpaceGB", usableSpace / (1024 * 1024 * 1024));
        diskMetrics.put("diskUsagePercent", ((double) usedSpace / totalSpace) * 100);
        return diskMetrics;
    }



    // network traffic
    public Map<String, Object> getNetworkTraffic() {
        List<NetworkIF> networkIFs = systemInfo.getHardware().getNetworkIFs();
        Map<String, Object> networkMetrics = new HashMap<>();

        long totalBytesSent = 0;
        long totalBytesReceived = 0;

        for (NetworkIF net : networkIFs) {
            net.updateAttributes(); // Update stats
            totalBytesSent += net.getBytesSent();
            totalBytesReceived += net.getBytesRecv();
        }

        networkMetrics.put("totalBytesSentMB", totalBytesSent / (1024 * 1024));     // Convert to MB
        networkMetrics.put("totalBytesReceivedMB", totalBytesReceived / (1024 * 1024)); // Convert to MB
        networkMetrics.put("interfaceCount", networkIFs.size());

        return networkMetrics;
    }
}
