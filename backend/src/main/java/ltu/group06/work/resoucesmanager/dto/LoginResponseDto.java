package ltu.group06.work.resoucesmanager.dto;

public class LoginResponseDto {
    private int id;
    private String username;
    private String email;
    private String targetUrl;
    private String role;

    public LoginResponseDto(int id, String username, String email, String targetUrl, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.targetUrl = targetUrl;
        this.role = role;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
