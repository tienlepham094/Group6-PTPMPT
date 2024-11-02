package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer> {
}