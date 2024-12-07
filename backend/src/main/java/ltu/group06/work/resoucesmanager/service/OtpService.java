package ltu.group06.work.resoucesmanager.service;

import lombok.RequiredArgsConstructor;
import ltu.group06.work.resoucesmanager.entity.OTP;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.OtpRepository;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    public String generateOTP() {
        StringBuilder otp = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    // Tạo OTP và trả về đối tượng OTP đã lưu
    public OTP sendOTP(User user) {
        disableOldOtps(user); // Vô hiệu hóa OTP cũ
        String otpCode = generateOTP();
        OTP otp = createAndSaveOTP(user, otpCode);  // Tạo và lưu OTP vào DB
        emailService.sendOTPEmail(user.getEmail(), otpCode);

        return otp;
    }

    public void disableOldOtps(User user) {
        List<OTP> oldOtps = otpRepository.findByUser(user);
        oldOtps.forEach(otp -> otp.setExpired(true));  // Đánh dấu OTP cũ là hết hạn
        otpRepository.saveAll(oldOtps);
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
