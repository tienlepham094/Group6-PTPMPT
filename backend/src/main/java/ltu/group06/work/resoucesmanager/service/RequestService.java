package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    public Request createRequest(Request request) {
        return requestRepository.save(request);
    }

    public Optional<Request> getRequestById(int requestId) {
        return requestRepository.findById(requestId);
    }

    public Request updateRequest(Request request) {
        return requestRepository.save(request);
    }

    public List<Request> getAllIssueRequestByUserId(int userId) {
        return requestRepository.findByUser_UserId(userId);
    }
}
