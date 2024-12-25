package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import ltu.group06.work.resoucesmanager.repository.AllocationRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public Allocation createAllocation(Allocation allocation) {
        return allocationRepository.save(allocation);
    }

    public Optional<Allocation> getAllocationById(Long id) {
        return allocationRepository.findById(id);
    }

    public List<Allocation> getAllocationsByResourceId(Long resourceId) {
        return allocationRepository.findByResourceId(resourceId);
    }

    public List<Allocation> getAllocationsByRequestId(Long requestId) {
        return allocationRepository.findByRequestId(requestId);
    }

    public static void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }
    public List<Allocation> getExpiredAllocations() {
        return allocationRepository.findAll().stream()
                .filter(allocation -> allocation.getEndTime().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());
    }

}
