package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "otps")
@Data
public class OTP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 6)
    private String otpCode;  // Mã OTP gồm 6 ký tự

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp expiresAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private boolean expired = false;

    // Khởi tạo giá trị cho thời gian tạo và hết hạn
    @PrePersist
    protected void onCreate() {
        this.createdAt = Timestamp.from(Instant.now());
        this.expiresAt = Timestamp.from(Instant.now().plusSeconds(30 * 60));  // Hết hạn sau 30 phút
    }

    public boolean isExpired() {
        return this.expired || Instant.now().isAfter(this.expiresAt.toInstant());
    }
}
