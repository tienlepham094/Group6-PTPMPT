package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "allocations2")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Allocation2 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request2 request;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource2 resource;

    @Column(name = "allocated_quantity", nullable = false)
    private int allocatedQuantity;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Allocation2(Long userId, Long resourceId, int quantity, LocalDateTime startTime, LocalDateTime endTime) {

    }
    public Long getUserId() {
        return request != null && request.getUser() != null ? request.getUser().getId() : null;
    }

    public Resource2.ResourceType getResourceType() {
        return resource != null ? resource.getType() : null; // Assuming Resource2 has a 'type' field
    }

    public int getQuantity() {
        return allocatedQuantity;
    }

}