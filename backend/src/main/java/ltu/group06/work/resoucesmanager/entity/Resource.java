package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_quantity", nullable = false)
    private int totalQuantity;

    // Getters and Setters for availableQuantity
    @Getter
    @Setter
    @Column(name = "available_quantity", nullable = false)
    private int availableQuantity;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = true)
    private Group group;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Getter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ResourceType type; // Add this field for type
    // Enum for ResourceType
    public enum ResourceType {
        GPU, CPU, MEMORY, STORAGE, NETWORK
    }
}
