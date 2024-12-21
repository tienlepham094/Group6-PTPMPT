package ltu.group06.work.resoucesmanager.dto;

import ltu.group06.work.resoucesmanager.entity.Resource2;

public class ResourceReleaseRequest {

    private Long userId;        // ID của người dùng trả lại tài nguyên
    private Long resourceId;    // ID tài nguyên cần trả lại

    private Resource2.ResourceType resourceType;    // ID tài nguyên cần trả lại
    private int amount;         // Số lượng tài nguyên trả lại

    // Constructor mặc định
    public ResourceReleaseRequest() {
    }

    // Constructor với các tham số
    public ResourceReleaseRequest(Long userId, Long resourceId, int amount,Resource2.ResourceType resourceType) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.amount = amount;
        this.resourceType = resourceType;
    }

    public ResourceReleaseRequest(Long userId, Long resourceId, int amount) {
        this.userId = userId;
        this.resourceId = resourceId;
        this.amount = amount;
    }

    public ResourceReleaseRequest(Long resourceId, int amount) {
        this.resourceId = resourceId;
        this.amount = amount;
    }

    // Getters và Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
    public Resource2.ResourceType getResourceType() {
        return resourceType;
    }
    public void setResourceType(Resource2.ResourceType resourceType) {
        this.resourceType = resourceType;
    }

    // Override phương thức toString() nếu cần thiết để dễ dàng kiểm tra
    @Override
    public String toString() {
        return "ResourceReleaseRequest{" +
                "userId=" + userId +
                ", resourceId=" + resourceId +
                ", amount=" + amount +
                '}';
    }
}
