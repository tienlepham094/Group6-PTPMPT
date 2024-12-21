package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.entity.UserGroup;
import ltu.group06.work.resoucesmanager.repository2.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserGroupService {

    @Autowired
    private UserGroupRepository userGroupRepository;

    public UserGroup addUserToGroup(UserGroup userGroup) {
        return userGroupRepository.save(userGroup);
    }

    public List<UserGroup> getUsersByGroupId(Long groupId) {
        return userGroupRepository.findByGroupId(groupId);
    }

    public List<UserGroup> getGroupsByUserId(Long userId) {
        return userGroupRepository.findByUserId(userId);
    }

    public void removeUserFromGroup(Long id) {
        userGroupRepository.deleteById(id);
    }
}
