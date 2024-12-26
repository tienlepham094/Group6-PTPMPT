package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()  // Lazy loading để giảm tải dữ liệu khi không cần thiết
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne()  // Lazy loading có thể đổi thành EAGER nếu bạn muốn tải dữ liệu cùng lúc
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status = Status.PENDING;

    @ManyToOne()
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status {
        PENDING, APPROVED, REJECTED, CANCELLED
    }

    // Getter để lấy ID của user
    public Long getUserId() {
        return user != null ? user.getId() : null;
    }

    // Getter để lấy ID của resource
    public Long getResourceId() {
        return resource != null ? resource.getId() : null;
    }

    // Getter để lấy loại resource (có thể cần điều chỉnh tùy thuộc vào cách định nghĩa Resource2)
    public Resource.ResourceType getResourceType() {
        return resource != null ? resource.getType() : null;
    }
}
