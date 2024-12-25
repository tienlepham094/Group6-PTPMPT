package ltu.group06.work.resoucesmanager.dto;

public class AllocationRequest {
    private Long userId;
    private Resource2.ResourceType resourceType;
    private int quantity;

    // Getters and Setters
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
