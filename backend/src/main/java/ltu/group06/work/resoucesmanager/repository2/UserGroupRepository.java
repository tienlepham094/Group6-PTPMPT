package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.User2;
import ltu.group06.work.resoucesmanager.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserGroupRepository extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByGroupId(Long groupId);
    List<UserGroup> findByUserId(Long userId);
    Optional<UserGroup> findByGroupIdAndUserId(Long groupId, Long userId);
    @Query("SELECT u FROM User2 u WHERE u.id NOT IN (SELECT ug.user.id FROM UserGroup ug WHERE ug.group.id = :groupId)")
    List<User2> findUsersNotInGroup(@Param("groupId") Long groupId);

}
