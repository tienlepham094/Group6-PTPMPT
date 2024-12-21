package ltu.group06.work.resoucesmanager.dto;

public class Resource {

    private Long id;            // ID của tài nguyên
    private String name;        // Tên tài nguyên
    private String type;        // Loại tài nguyên (ví dụ: CPU, GPU)
    private int availableAmount; // Số lượng tài nguyên có sẵn

    // Constructor mặc định
    public Resource() {
    }

    // Constructor với các tham số
    public Resource(Long id, String name, String type, int availableAmount) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.availableAmount = availableAmount;
    }

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getAvailableAmount() {
        return availableAmount;
    }

    public void setAvailableAmount(int availableAmount) {
        this.availableAmount = availableAmount;
    }

    // Override phương thức toString() nếu cần thiết để dễ dàng kiểm tra
    @Override
    public String toString() {
        return "Resource{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", availableAmount=" + availableAmount +
                '}';
    }
}
