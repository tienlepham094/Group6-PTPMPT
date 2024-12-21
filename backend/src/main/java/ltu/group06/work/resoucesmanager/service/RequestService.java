package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request updateRequest(Request request) {
        return requestRepository.save(request);
    }

    public Optional<Request> updateRequest(Integer requestId, Request requestDetails) {
        Optional<Request> existingRequest = requestRepository.findById(requestId);
        if (existingRequest.isPresent()) {
            Request requestToUpdate = existingRequest.get();
            requestToUpdate.setQuantity(requestDetails.getQuantity());
            requestToUpdate.setReason(requestDetails.getReason());
            return Optional.of(requestRepository.save(requestToUpdate));
        }
        return Optional.empty();
    }

    public List<Request> getAllRequestsByUserId(Integer userId) {
        return requestRepository.findByUser_UserId(userId);
    }

    public void deleteRequest(Integer requestId) {
        requestRepository.deleteById(requestId);
    }

    public List<Request> getAllIssueRequestByUserId(int userId) {
        return requestRepository.findByUser_UserId(userId);
    }

    public Request save(Request request) {
        return requestRepository.save(request);
    }
    public Optional<Request> getRequestById(Integer requestId) {
        return requestRepository.findById(requestId);
    }

}
