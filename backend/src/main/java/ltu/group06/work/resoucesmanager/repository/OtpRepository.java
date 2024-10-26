package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.OTP;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByOtpCode(String otpCode);
}
