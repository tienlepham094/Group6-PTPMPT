package ltu.group06.work.resoucesmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordChangeDto {
    private String usernameOrEmail;
    private String currentPassword;
    private String newPassword;
}