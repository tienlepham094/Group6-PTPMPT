package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.entity.Request2;
import ltu.group06.work.resoucesmanager.repository2.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public Request2 createRequest(Request2 request) {
        return requestRepository.save(request);
    }

    public Optional<Request2> getRequestById(Long id) {
        return requestRepository.findById(id);
    }

    public List<Request2> getRequestsByUserId(Long userId) {
        return requestRepository.findByUserId(userId);
    }

    public List<Request2> getRequestsByStatus(Request2.Status status) {
        return requestRepository.findByStatus(status);
    }

    public void updateRequestStatus(Long requestId, Request2.Status status) {
        Optional<Request2> requestOptional = requestRepository.findById(requestId);
        if (requestOptional.isPresent()) {
            Request2 request = requestOptional.get();
            request.setStatus(status);
            requestRepository.save(request);
        }
    }
}
