package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.OTP;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.OtpRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    public OtpService(OtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
    }

    public String generateOTP() {
        StringBuilder otp = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    // Tạo OTP và trả về đối tượng OTP đã lưu
    public OTP sendOTP(User user) {
        String otpCode = generateOTP();
        OTP otp = createAndSaveOTP(user, otpCode);  // Tạo và lưu OTP vào DB
        emailService.sendOTPEmail(user.getEmail(), otpCode);

        return otp;
    }

    // Tạo OTP và lưu vào DB
    private OTP createAndSaveOTP(User user, String otpCode) {
        OTP otp = new OTP();
        otp.setOtpCode(otpCode);
        otp.setUser(user);
        return otpRepository.save(otp);
    }

    public boolean isValidOTP(String otpCode) {
        return otpRepository.findByOtpCode(otpCode)
                .filter(otp -> !otp.isExpired())
                .isPresent();
    }
}
