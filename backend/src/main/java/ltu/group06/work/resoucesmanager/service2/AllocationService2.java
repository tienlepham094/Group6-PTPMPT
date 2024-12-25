package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.entity.Allocation2;
import ltu.group06.work.resoucesmanager.repository2.AllocationRepository2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AllocationService2 {

    @Autowired
    private AllocationRepository2 allocationRepository;

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
    public List<Allocation2> getExpiredAllocations() {
        return allocationRepository.findAll().stream()
                .filter(allocation -> allocation.getEndTime().isBefore(LocalDateTime.now()))
                .collect(Collectors.toList());
    }

}
