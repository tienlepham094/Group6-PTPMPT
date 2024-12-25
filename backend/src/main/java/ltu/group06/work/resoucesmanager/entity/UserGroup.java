package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`user_groups`")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User2 user;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;
}
