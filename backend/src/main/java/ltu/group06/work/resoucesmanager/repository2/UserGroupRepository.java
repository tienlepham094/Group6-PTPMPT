package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByGroupId(Long groupId);
    List<UserGroup> findByUserId(Long userId);
}
