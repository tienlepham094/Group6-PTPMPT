package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Request2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request2, Long> {
    List<Request2> findByUserId(Long userId);
    List<Request2> findByStatus(Request2.Status status);
}
