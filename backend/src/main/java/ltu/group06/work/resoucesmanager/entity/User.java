package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 255)
    private String passwordHash;

    @Column(nullable = false, length = 20)
    private String role;  // 'user', 'admin'

    @Column(nullable = false)
    private boolean isActive = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OTP> otps;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Request> requests;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Approval> approvals;

    @Column(nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp updatedAt;
    // Khởi tạo thời gian trước khi lưu bản ghi mới
    @PrePersist
    protected void onCreate() {
        Timestamp now = Timestamp.from(Instant.now());
        this.createdAt = now;
        this.updatedAt = now;
    }

    // Cập nhật thời gian trước khi cập nhật bản ghi
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Timestamp.from(Instant.now());
    }
}
