package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.TelegramUser;
import ltu.group06.work.resoucesmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TelegramUserRepository extends JpaRepository<TelegramUser, Long> {
    List<TelegramUser> findByTelegramId(Long telegramId);
    Optional<TelegramUser> findByUser_Id(long userId);
    boolean existsByTelegramIdAndUser(Long telegramId, User user);

}
