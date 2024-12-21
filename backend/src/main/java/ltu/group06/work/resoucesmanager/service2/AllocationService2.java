package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.entity.Allocation2;
import ltu.group06.work.resoucesmanager.repository2.AllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllocationService {

    @Autowired
    private AllocationRepository allocationRepository;

    public Allocation2 createAllocation(Allocation2 allocation) {
        return allocationRepository.save(allocation);
    }

    public Optional<Allocation2> getAllocationById(Long id) {
        return allocationRepository.findById(id);
    }

    public List<Allocation2> getAllocationsByResourceId(Long resourceId) {
        return allocationRepository.findByResourceId(resourceId);
    }

    public List<Allocation2> getAllocationsByRequestId(Long requestId) {
        return allocationRepository.findByRequestId(requestId);
    }

    public void deleteAllocation(Long id) {
        allocationRepository.deleteById(id);
    }
}
