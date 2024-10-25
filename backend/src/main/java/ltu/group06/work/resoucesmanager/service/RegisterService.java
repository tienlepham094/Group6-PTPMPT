package ltu.group06.work.resoucesmanager.service;



import jakarta.mail.MessagingException;
import ltu.group06.work.resoucesmanager.dto.RegisterRequest;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.Random;

@Service
public class RegisterService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public RegisterService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public String registerUser(RegisterRequest registerRequest) throws MessagingException {
        // Kiểm tra xem username hoặc email đã tồn tại chưa
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Mã hóa mật khẩu
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

        // Sinh mã OTP
        String otp = generateOtp();

        // Tạo đối tượng User mới
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPasswordHash(encodedPassword);
        newUser.setRole(registerRequest.getRole());
        newUser.setTelegramId(registerRequest.getTelegramId());
        newUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        newUser.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        // Lưu vào cơ sở dữ liệu
        userRepository.save(newUser);

        // Gửi OTP qua email
        emailService.sendOtpEmail(registerRequest.getEmail(), otp);

        return "User registered successfully. Please check your email for OTP.";
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);  // OTP 6 chữ số
        return String.valueOf(otp);
    }
}
