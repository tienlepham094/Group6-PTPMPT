package ltu.group06.work.resoucesmanager.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ltu.group06.work.resoucesmanager.entity.Resource.ResourceType;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RequestResourcesDto {
    private ResourceType resource_type;
    private int quantity;
    private String reason;
    private int time_usage;
    private String end_time;
    private int user_id;

}
