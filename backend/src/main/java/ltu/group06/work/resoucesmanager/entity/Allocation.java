package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "allocations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Allocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "request_id", nullable = false)
    private Request request;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resource resource;

    @Column(name = "allocated_quantity", nullable = false)
    private int allocatedQuantity;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Allocation(Long userId, Long resourceId, int quantity, LocalDateTime startTime, LocalDateTime endTime) {

    }

    public Allocation(Request request, Long resourceId, int quantity, LocalDateTime startTime, LocalDateTime endTime) {
        this.request = request;  // Set the request
        this.resource = new Resource(resourceId);  // Assuming you want to initialize Resource2 using resourceId
        this.allocatedQuantity = quantity;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = LocalDateTime.now();
    }
    public Long getUserId() {
        return request != null && request.getUser() != null ? request.getUser().getId() : null;
    }

    public Resource.ResourceType getResourceType() {
        return resource != null ? resource.getType() : null;
    }

    public int getQuantity() {
        return allocatedQuantity;
    }

}