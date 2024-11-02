package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Integer> {
}
