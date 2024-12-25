package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.User;
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
    @Query("SELECT u FROM User u WHERE u.id NOT IN (SELECT ug.user.id FROM UserGroup ug WHERE ug.group.id = :groupId)")
    List<User> findUsersNotInGroup(@Param("groupId") Long groupId);

}
