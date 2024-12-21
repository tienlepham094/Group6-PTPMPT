package ltu.group06.work.resoucesmanager.controller2;

import ltu.group06.work.resoucesmanager.entity.UserGroup;
import ltu.group06.work.resoucesmanager.service2.UserGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth/api/user-groups")
public class UserGroupController {

    @Autowired
    private UserGroupService userGroupService;

    @PostMapping
    public ResponseEntity<UserGroup> addUserToGroup(@RequestBody UserGroup userGroup) {
        UserGroup createdUserGroup = userGroupService.addUserToGroup(userGroup);
        return ResponseEntity.ok(createdUserGroup);
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<UserGroup>> getUsersByGroupId(@PathVariable Long groupId) {
        List<UserGroup> users = userGroupService.getUsersByGroupId(groupId);
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeUserFromGroup(@PathVariable Long id) {
        userGroupService.removeUserFromGroup(id);
        return ResponseEntity.noContent().build();
    }
}
