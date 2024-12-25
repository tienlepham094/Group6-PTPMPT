package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_resources")
@Data
//@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResources {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // ID của tài nguyên
    private Long userId;  // ID của người dùng
    private Resource2.ResourceType resourceType;  // Loại tài nguyên (ví dụ: GPU, CPU)
    private int quantity;  // Số lượng tài nguyên của người dùng

    // Constructor
    public UserResources() {}

    public UserResources(Long userId, Resource2.ResourceType resourceType, int quantity) {
        this.userId = userId;
        this.resourceType = resourceType;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Resource2.ResourceType getResourceType() {
        return resourceType;
    }

    public void setResourceType(Resource2.ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
