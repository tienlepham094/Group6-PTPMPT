package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByTelegramId(Long telegramId);
    boolean existsByTelegramId(Long telegramId);
}