package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.dto.ResourceAllocationRequest;
import ltu.group06.work.resoucesmanager.dto.ResourceReleaseRequest;
import ltu.group06.work.resoucesmanager.entity.Request;
import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.repository.RequestRepository;
import ltu.group06.work.resoucesmanager.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private RequestRepository requestRepository;

////    public Optional<Resource> findAvailableResource(Resource.ResourceType resourceType) {
//        return resourceRepository.findByResourceTypeAndStatusResources(resourceType, Resource.ResourceStatus.available);
////    }
//    public Optional<Resource> findAllocatedResource(Resource.ResourceType resourceType) {
//        return resourceRepository.findByResourceTypeAndStatusResources(resourceType, Resource.ResourceStatus.allocated);
//    }
//
//    public List<Resource> getAllResources() {
//        return resourceRepository.findAll();
//    }
//
//    public Optional<Resource> findByResourceTypeAndStatus(Resource.ResourceType resourceType, Resource.ResourceStatus statusResources) {
//        return resourceRepository.findByResourceTypeAndStatusResources(resourceType, statusResources);
//    }

    public void updateResource(Resource resource) {
        resourceRepository.save(resource);
    }
    public Optional<Request> getRequestById(Integer requestId) {
        return requestRepository.findById(requestId);
    }


    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }

    public List<Resource> getResourceByGroupId(Long id) {
        return resourceRepository.findByGroupId(id);
    }

//    public Optional<Resource> getResourceByType(Resource.ResourceType type) {
//        return resourceRepository.;
//    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public boolean checkIfResourceExists(String name) {
        return resourceRepository.existsByName(name);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
    // Cấp phát tài nguyên
    // In ResourceService

    // Cấp phát tài nguyên
    public boolean allocateResource(ResourceAllocationRequest allocationRequest) {
        Optional<Resource> resourceOptional = resourceRepository.findById(allocationRequest.getResourceId());

        if (resourceOptional.isPresent()) {
            Resource resource = resourceOptional.get();
            // Kiểm tra xem tài nguyên có đủ số lượng không
            if (resource.getAvailableQuantity() >= allocationRequest.getAmount()) {
                // Cập nhật số lượng tài nguyên có sẵn
                resource.setAvailableQuantity(resource.getAvailableQuantity() - allocationRequest.getAmount());
                resourceRepository.save(resource);
                return true; // Cấp phát thành công
            } else {
                return false; // Không đủ tài nguyên để cấp phát
            }
        } else {
            return false; // Tài nguyên không tồn tại
        }
    }

    // Trả lại tài nguyên
    public boolean releaseResource(ResourceReleaseRequest releaseRequest) {
        Optional<Resource> resourceOptional = resourceRepository.findById(releaseRequest.getResourceId());

        if (resourceOptional.isPresent()) {
            Resource resource = resourceOptional.get();
            // Cập nhật lại số lượng tài nguyên sau khi trả lại
            resource.setAvailableQuantity(resource.getAvailableQuantity() + releaseRequest.getAmount());
            resourceRepository.save(resource);
            return true; // Trả lại tài nguyên thành công
        } else {
            return false; // Tài nguyên không tồn tại
        }
    }
}