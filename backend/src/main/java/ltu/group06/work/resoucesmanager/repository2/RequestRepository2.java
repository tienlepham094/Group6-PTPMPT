package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Request2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository2 extends JpaRepository<Request2, Long> {
    List<Request2> findByUser_Id(Long userId);
    List<Request2> findByStatus(Request2.Status status);
//    List<Request2> findByGroupId(Long groupId);
}
