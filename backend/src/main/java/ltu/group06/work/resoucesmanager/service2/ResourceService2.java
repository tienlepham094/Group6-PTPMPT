package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.dto.ResourceAllocationRequest;
import ltu.group06.work.resoucesmanager.dto.ResourceReleaseRequest;
import ltu.group06.work.resoucesmanager.entity.Resource2;
import ltu.group06.work.resoucesmanager.repository2.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public Resource2 createResource(Resource2 resource) {
        return resourceRepository.save(resource);
    }

    public Optional<Resource2> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }

    public List<Resource2> getAllResources() {
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
        Optional<Resource2> resourceOptional = resourceRepository.findById(allocationRequest.getResourceId());

        if (resourceOptional.isPresent()) {
            Resource2 resource = resourceOptional.get();
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
        Optional<Resource2> resourceOptional = resourceRepository.findById(releaseRequest.getResourceId());

        if (resourceOptional.isPresent()) {
            Resource2 resource = resourceOptional.get();
            // Cập nhật lại số lượng tài nguyên sau khi trả lại
            resource.setAvailableQuantity(resource.getAvailableQuantity() + releaseRequest.getAmount());
            resourceRepository.save(resource);
            return true; // Trả lại tài nguyên thành công
        } else {
            return false; // Tài nguyên không tồn tại
        }
    }

}
