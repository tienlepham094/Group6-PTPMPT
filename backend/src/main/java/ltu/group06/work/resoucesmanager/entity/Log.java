package ltu.group06.work.resoucesmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.sql.Timestamp;

@Entity
@Table(name = "logs")
@Data
public class Log {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;

    @Column(name = "user_id")
    private Integer userId;  // Không ràng buộc khóa ngoại

    @Column(name = "request_id")
    private Integer requestId;  // Không ràng buộc khóa ngoại

    @Column(nullable = false, length = 100)
    private String action;

    @Lob
    private String description;

    @Column(nullable = false)
    private Timestamp timestamp;
}
