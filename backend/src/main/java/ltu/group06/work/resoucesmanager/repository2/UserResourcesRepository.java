package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Resource2;
import ltu.group06.work.resoucesmanager.entity.UserResources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResourcesRepository extends JpaRepository<UserResources, Long> {
    // Tìm kiếm tài nguyên của người dùng theo userId và resourceType
    UserResources findByUserIdAndResourceType(Long userId, Resource2.ResourceType resourceType);
}
