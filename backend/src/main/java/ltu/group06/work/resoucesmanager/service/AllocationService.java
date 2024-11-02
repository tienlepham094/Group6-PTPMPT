package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.repository.AllocationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class AllocationService {
    @Autowired
    private AllocationRepository allocationRepository;

    public List<Allocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    public void saveAllocation(Allocation allocation) {
        allocationRepository.save(allocation);
    }
}
