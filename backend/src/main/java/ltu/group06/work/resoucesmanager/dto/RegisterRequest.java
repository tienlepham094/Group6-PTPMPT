package ltu.group06.work.resoucesmanager.dto;


import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String role;  // 'ROLE_USER' hoặc 'ROLE_ADMIN'
}