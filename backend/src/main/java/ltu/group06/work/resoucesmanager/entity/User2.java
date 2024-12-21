package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.Email;

import java.time.LocalDateTime;

@Entity
@Table(name = "users2")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User2 {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Email
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, length = 20)
    private Role role;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // Automatically set 'createdAt' before persisting the entity
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public enum Role {
        ADMIN, MANAGER, USER
    }

}
