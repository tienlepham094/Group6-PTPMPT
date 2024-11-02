package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Integer> {
}
