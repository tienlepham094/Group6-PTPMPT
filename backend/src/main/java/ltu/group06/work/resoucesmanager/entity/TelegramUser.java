package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Table(name = "telegramuser")
@Data
public class TelegramUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ID tự tăng

    @Column(nullable = false)
    private Long telegramId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Timestamp linkedAt;

    @PrePersist
    protected void onLink() {
        this.linkedAt = Timestamp.from(Instant.now());
    }
}
