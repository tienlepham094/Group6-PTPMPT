package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Allocation2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation2, Long> {
    List<Allocation2> findByResourceId(Long resourceId);
    List<Allocation2> findByRequestId(Long requestId);
}
