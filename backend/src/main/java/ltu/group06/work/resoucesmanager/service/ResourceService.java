package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public Optional<Resource> findAvailableResource(Resource.ResourceType resourceType) {
        return resourceRepository.findByResourceTypeAndStatusResources(resourceType, Resource.ResourceStatus.available);
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public void updateResource(Resource resource) {
        resourceRepository.save(resource);
    }

}