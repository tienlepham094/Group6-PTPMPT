package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }
}