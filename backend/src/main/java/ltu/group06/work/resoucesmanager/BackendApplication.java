package ltu.group06.work.resoucesmanager;

import ltu.group06.work.resoucesmanager.telegrambot.TelegramBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

//    @Autowired
    private TelegramBotService botService;
    private final TelegramBotsApi telegramBotsApi;

    public BackendApplication(TelegramBotService botService) throws TelegramApiException {
        this.botService = botService;
        this.telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        startBot();
    }
    public void startBot() {
        try {
//            TelegramBotsApi telegramBotsApi = new TelegramBotsApi(DefaultBotSession.class);
            telegramBotsApi.registerBot(botService);
            System.out.println("Bot đã được đăng ký thành công!");
        } catch (TelegramApiException e) {
            e.printStackTrace();
            System.err.println("Lỗi khi đăng ký bot: " + e.getMessage());
        }
    }
}
