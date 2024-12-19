package ltu.group06.work.resoucesmanager.controller.admincontroller;

import ltu.group06.work.resoucesmanager.entity.*;
import ltu.group06.work.resoucesmanager.service.*;
import ltu.group06.work.resoucesmanager.telegrambot.TelegramBotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/app/admin")
@CrossOrigin(origins = "*")

public class ApprovalRequestController {
    @Autowired
    private RequestService requestService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private AllocationService allocationService;

    @Autowired
    private ApprovalService approvalService;

    @Autowired
    private LogService logService;
    @Autowired
    private TelegramUserService telegramUserService;
    @Autowired
    private TelegramBotService telegramBotService;
    @PostMapping("/request/approve")
    public ResponseEntity<Map<String, Object>> approveRequest(@RequestBody Map<String, String> requestBody) {
        int requestId = Integer.parseInt(requestBody.get("requestId"));
        String action = requestBody.get("action"); // "approve", "reject", "queue"
        String comments = requestBody.get("comments"); // Optional comment

        Optional<Request> optionalRequest = requestService.getRequestById(requestId);
        if (optionalRequest.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Request not found"));
        }

        Request request = optionalRequest.get();
        if(request.getStatusRequest() != Request.RequestStatus.pending){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Request has already been processed, it's not pending"));
        }

        // Check if the request is already processed
        if (request.getStatusRequest() != Request.RequestStatus.pending) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", "Request has already been processed")
            );
        }

        // Check resource availability
        Optional<Resource> optionalResource  = resourceService.findAvailableResource(request.getResourceType());
        boolean isEnoughResource = optionalResource.isPresent() && optionalResource.get().getQuantity() >= request.getQuantity();

        Map<String, Object> response = new HashMap<>();
        Approval approval = new Approval();
        approval.setRequest(request);
        approval.setComments(comments);

        String message;
        Optional<TelegramUser> telegramUserOptional = Optional.ofNullable(telegramUserService.getTelegramUserByUserId(request.getUser().getUserId()));

        if ("approve".equalsIgnoreCase(action)) {
            if (!isEnoughResource) {
                response.put("message", "Not enough resources available. Please queue the request or reject it.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            // Cập nhật trạng thái request và tài nguyên
            request.setStatusRequest(Request.RequestStatus.approved);
            request.setStartTime(LocalDateTime.now());
            request.setEnd_time(request.getStartTime().plusHours(request.getTimeUsage()));
            approval.setApprovalStatus(Approval.ApprovalStatus.approved);
            approval.setApprovedAt(Timestamp.from(Instant.now()));
            approvalService.saveApproval(approval);

            // Phan phat tai nguyen
            if (optionalResource.isPresent()) {
                Resource availableResource = optionalResource.get();

                // Giảm số lượng `available`
                int newAvailableQuantity = availableResource.getQuantity() - request.getQuantity();
                availableResource.setQuantity(newAvailableQuantity);
                resourceService.updateResource(availableResource);

                // Tìm hoặc tạo tài nguyên `allocated`
                Optional<Resource> optionalAllocatedResource = resourceService.findAllocatedResource(request.getResourceType());
                Resource allocatedResource;
                if (optionalAllocatedResource.isPresent()) {
                    allocatedResource = optionalAllocatedResource.get();
                    allocatedResource.setQuantity(allocatedResource.getQuantity() + request.getQuantity());
                } else {
                    allocatedResource = new Resource();
                    allocatedResource.setResourceType(request.getResourceType());
                    allocatedResource.setQuantity(request.getQuantity());
                    allocatedResource.setStatusResources(Resource.ResourceStatus.allocated);
                    allocatedResource.setCreatedAt(Timestamp.from(Instant.now()));
                    allocatedResource.setUpdatedAt(Timestamp.from(Instant.now()));
                }
                resourceService.updateResource(allocatedResource);


                Allocation allocation = new Allocation();
                allocation.setRequest(request);
                allocation.setResource(allocatedResource);
                allocation.setAllocatedQuantity(request.getQuantity());
                allocation.setAllocatedAt(Timestamp.from(Instant.now()));
                allocationService.saveAllocation(allocation);

                String logDescription = "Request approved and resources allocated. Status: " + request.getStatusRequest().toString() +
                        ", Start time: " + (request.getStartTime() != null ? request.getStartTime().toString() : "N/A") +
                        ", End time: " + (request.getEnd_time() != null ? request.getEnd_time().toString() : "N/A");

                logService.createLog(null, request.getRequestId(), "APPROVE_REQUEST", logDescription);
                response.put("message", "Request approved successfully and resources allocated.");
                message = "Yêu cầu sử dụng tài nguyên với ID: " + requestId + " đã được chấp thuận.";
            } else {
                message = "";
            }

        } else if ("reject".equalsIgnoreCase(action)) {
            request.setStatusRequest(Request.RequestStatus.rejected);
            approval.setApprovalStatus(Approval.ApprovalStatus.rejected);
            approval.setApprovedAt(Timestamp.from(Instant.now()));
            approvalService.saveApproval(approval);

            logService.createLog(
                    null,
                    request.getRequestId(),
                    "REJECT_REQUEST",
                    "Request rejected by admin."
            );

            response.put("message", "Request rejected successfully.");
            message = "Yêu cầu sử dụng tài nguyên với ID: " + requestId + "  đã bị từ chối.";

        } else if ("queue".equalsIgnoreCase(action)) {
            request.setStatusRequest(Request.RequestStatus.queued);
            approval.setApprovalStatus(Approval.ApprovalStatus.queued);
            approval.setApprovedAt(Timestamp.from(Instant.now()));
            approvalService.saveApproval(approval);

            logService.createLog(
                    null,
                    request.getRequestId(),
                    "QUEUE_REQUEST",
                    "Request queued due to insufficient resources."
            );

            response.put("message", "Request queued successfully.");
            message = "Yêu cầu sử dụng tài nguyên với ID: " + requestId + " cấp phát. Đã cho vào hàng đợi!";

        } else {
            message = "Invalid action. Use 'approve', 'reject', or 'queue'";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    Map.of("error", "Invalid action. Use 'approve', 'reject', or 'queue'")
            );
        }

        requestService.updateRequest(request);
        telegramUserOptional.ifPresent(telegramUser -> {
            telegramBotService.sendMessageToUser(telegramUser.getTelegramId(), message);
        });
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
