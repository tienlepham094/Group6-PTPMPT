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
    private ResourceType resourceType;
    private int quantity;
    private String reason;
    private Integer endTimeHours;
    private String endTime;
    private int userId;

}
