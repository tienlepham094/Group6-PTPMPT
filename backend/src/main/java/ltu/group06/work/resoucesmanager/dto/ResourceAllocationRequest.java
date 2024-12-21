package ltu.group06.work.resoucesmanager.dto;

public class ResourceAllocationRequest {

    private Long userId;        // ID của người dùng nhận tài nguyên
    private Long resourceId;    // ID tài nguyên cần cấp phát
    private int amount;         // Số lượng tài nguyên yêu cầu

    // Constructor mặc định
    public ResourceAllocationRequest() {
    }

    // Constructor với các tham số
    public ResourceAllocationRequest(Long userId, Long resourceId, int amount) {
        this.userId = userId;
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

    // Override phương thức toString() nếu cần thiết để dễ dàng kiểm tra
    @Override
    public String toString() {
        return "ResourceAllocationRequest{" +
                "userId=" + userId +
                ", resourceId=" + resourceId +
                ", amount=" + amount +
                '}';
    }
}
