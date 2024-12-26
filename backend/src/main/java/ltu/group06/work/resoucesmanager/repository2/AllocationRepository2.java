package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Allocation2;
import ltu.group06.work.resoucesmanager.entity.Request2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AllocationRepository2 extends JpaRepository<Allocation2, Long> {
    List<Allocation2> findByResourceId(Long resourceId);
    List<Allocation2> findByRequestId(Long requestId);
    @Query("SELECT a FROM Allocation2 a WHERE a.endTime < :now AND a.request.status = :status")
    List<Allocation2> findExpiredAllocations(@Param("now") LocalDateTime now, @Param("status") Request2.Status status);
    List<Allocation2> findByRequest_User_Id(Long userId);
}
