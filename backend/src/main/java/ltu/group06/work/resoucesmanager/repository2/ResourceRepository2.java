package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Resource2;
import ltu.group06.work.resoucesmanager.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository2 extends JpaRepository<Resource2, Long> {
    boolean existsByName(String name);
    List<Resource2> findByGroupId(Long groupId);
}