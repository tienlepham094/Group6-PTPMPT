package ltu.group06.work.resoucesmanager.telegrambot;

import ltu.group06.work.resoucesmanager.entity.OTP;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.OtpService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.stereotype.Service;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TelegramBotService extends TelegramLongPollingBot {

    private final UserService userService;
    private final OtpService otpService;

    // Map để theo dõi trạng thái người dùng đang chờ nhập OTP
    private final ConcurrentHashMap<Long, OTP> awaitingOtpMap = new ConcurrentHashMap<>();

    // Map để theo dõi người dùng đang chờ nhập email
    private final ConcurrentHashMap<Long, Boolean> awaitingEmailMap = new ConcurrentHashMap<>();

    public TelegramBotService(UserService userService, OtpService otpService) {
        this.userService = userService;
        this.otpService = otpService;
    }

    @Override
    public String getBotUsername() {
        return "ResourcesManagerBot";
    }

    @Override
    public String getBotToken() {
        return "7888523580:AAFEH_VXRj4N4PYeuBEqe70hwRm60uSo9LU";
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            String messageText = update.getMessage().getText();
            Long chatId = update.getMessage().getChatId();

            if (messageText.equalsIgnoreCase("/start")) {
                sendMessage(chatId, "Chào mừng bạn đến với ResourcesManagerBot! Nhập /help để xem các tùy chọn.");
            } else if (messageText.equalsIgnoreCase("/help")) {
                sendMessage(chatId, "/active - Kích hoạt tài khoản bằng email\n/help - Hiển thị các tùy chọn");
            } else if (messageText.equalsIgnoreCase("/active")) {
                sendMessage(chatId, "Vui lòng nhập email của bạn để kích hoạt.");
                awaitingEmailMap.put(chatId, true);  // Đánh dấu người dùng đang chờ nhập email
            } else if (awaitingEmailMap.getOrDefault(chatId, false)) {
                handleEmailInput(chatId, messageText);
            } else if (awaitingOtpMap.containsKey(chatId)) {
                handleOtpInput(chatId, messageText);
            } else {
                sendMessage(chatId, "Lệnh không hợp lệ. Nhập /help để xem các tùy chọn.");
            }
        }
    }

    private void handleEmailInput(Long chatId, String email) {
        Optional<User> userOpt = userService.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            OTP otp = otpService.sendOTP(user);  // Gửi OTP và lưu vào DB
            sendMessage(chatId, "OTP đã được gửi đến email của bạn. Vui lòng nhập OTP trong vòng 15 phút.");
            awaitingOtpMap.put(chatId, otp);  // Lưu OTP vào Map để kiểm tra sau
            awaitingEmailMap.remove(chatId);  // Xóa trạng thái chờ email
        } else {
            sendMessage(chatId, "Email không tồn tại trong hệ thống. Vui lòng thử lại.");
        }
    }

    private void handleOtpInput(Long chatId, String otpCode) {
        OTP otp = awaitingOtpMap.get(chatId);

        if (otp.isExpired() || !otp.getOtpCode().equals(otpCode)) {
            sendMessage(chatId, "OTP không hợp lệ hoặc đã hết hạn. Bạn có muốn gửi lại OTP không? (Trả lời 'yes' để gửi lại)");
            awaitingOtpMap.remove(chatId);  // Xóa trạng thái chờ OTP
        } else {
            Optional<User> userOpt = userService.findByEmail(otp.getUser().getEmail());

            if (userOpt.isPresent()) {
                User user = userOpt.get();
                user.setTelegramId(chatId);  // Lưu Telegram ID vào User
                userService.save(user);  // Cập nhật thông tin User trong DB

                sendMessage(chatId, "Kích hoạt thành công! Tài khoản của bạn đã được liên kết với bot Telegram.");
                awaitingOtpMap.remove(chatId);  // Xóa trạng thái chờ OTP
            } else {
                sendMessage(chatId, "Đã xảy ra lỗi. Không tìm thấy tài khoản.");
            }
        }
    }

    private void sendMessage(Long chatId, String text) {
        SendMessage message = new SendMessage();
        message.setChatId(chatId.toString());
        message.setText(text);
        try {
            execute(message);  // Gửi tin nhắn tới người dùng
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
