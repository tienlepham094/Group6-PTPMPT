package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Integer> {
    @Query("select a from Allocation a where a.releasedAt is not null and a.request.end_time >= :now")
    List<Allocation> findAllocationsDueForRecovery(LocalDateTime now);
}
