package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "requests")
@Data
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Resource.ResourceType resourceType;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = true)
    private LocalDateTime startTime;

    @Column(nullable = true)
    private LocalDateTime end_time;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus statusRequest;  // pending, approved, rejected

    private String reason;

    @Column(nullable = true)
    private Integer timeUsage; // in hours

    @OneToOne(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    private Approval approval;

    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Allocation> allocations;

    @Column(nullable = true, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum RequestStatus {
        pending, approved, rejected, cancelled, queued, completed
    }

    // tự động điền thời gian khi tạo mới
    @PrePersist
    protected void onCreate() {
        LocalDateTime currentTime = LocalDateTime.now();
        this.createdAt = currentTime;
        this.updatedAt = currentTime;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
