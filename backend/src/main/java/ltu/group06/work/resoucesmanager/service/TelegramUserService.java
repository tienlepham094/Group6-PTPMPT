package ltu.group06.work.resoucesmanager.service;

import lombok.RequiredArgsConstructor;
import ltu.group06.work.resoucesmanager.entity.TelegramUser;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.TelegramUserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TelegramUserService {

    private final TelegramUserRepository telegramUserRepository;

    public void linkTelegramAccount(Long telegramId, User user) {
        if (telegramUserRepository.existsByTelegramIdAndUser(telegramId, user)) {
            throw new IllegalStateException("Telegram ID đã được liên kết với tài khoản này.");
        }

        TelegramUser telegramUser = new TelegramUser();
        telegramUser.setTelegramId(telegramId);
        telegramUser.setUser(user);
        telegramUserRepository.save(telegramUser);

        // Đánh dấu tài khoản là active
        user.setActive(true);
    }
    public boolean isTelegramLinked(Long telegramId, User user) {
        return telegramUserRepository.existsByTelegramIdAndUser(telegramId, user);
    }

    public TelegramUser getTelegramUserByUserId(int userId) {
        return telegramUserRepository.findByUser_UserId(userId).orElse(null);
    }
}