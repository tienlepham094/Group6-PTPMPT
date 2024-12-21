package ltu.group06.work.resoucesmanager.repository2;

import ltu.group06.work.resoucesmanager.entity.Resource2;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends JpaRepository<Resource2, Long> {
    boolean existsByName(String name);
}