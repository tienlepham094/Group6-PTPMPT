package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Log;
import ltu.group06.work.resoucesmanager.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    public List<Log> getAllLogs() {
        return logRepository.findAll();
    }

    public void createLog(Integer userId, Integer requestId, String action, String description) {
        Log log = new Log();
        log.setUserId(userId);
        log.setRequestId(requestId);
        log.setAction(action);
        log.setDescription(description);
        log.setTimestamp(Timestamp.from(Instant.now()));

        logRepository.save(log);
    }
}