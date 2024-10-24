package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Table(name = "approvals")
@Data
public class Approval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int approvalId;

    @OneToOne
    @JoinColumn(name = "request_id")
    private Request request;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private User admin;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApprovalStatus approvalStatus;  // approved, rejected

    private String comments;

    @Column(nullable = false)
    private Timestamp approvedAt;

    public enum ApprovalStatus {
        approved, rejected
    }
}
