package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Table(name = "allocations")
@Data
public class Allocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int allocationId;

    @ManyToOne
    @JoinColumn(name = "request_id")
    private Request request;

    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resource resource;

    @Column(nullable = false)
    private int allocatedQuantity;

    @Column(nullable = false)
    private Timestamp allocatedAt;

    private Timestamp releasedAt;
}
