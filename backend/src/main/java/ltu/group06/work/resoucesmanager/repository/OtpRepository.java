package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.OTP;
import ltu.group06.work.resoucesmanager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface OtpRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByOtpCode(String otpCode);
    List<OTP> findByUser(User user);
}
