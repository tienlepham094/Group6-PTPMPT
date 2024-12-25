package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Group;
import ltu.group06.work.resoucesmanager.repository.GroupRepository;
import ltu.group06.work.resoucesmanager.repository.UserGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;

    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    public Optional<Group> getGroupById(Long id) {
        return groupRepository.findById(id);
    }

    public List<Group> getGroupsByManagerId(Long managerId) {
        return groupRepository.findByManagerId(managerId);
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }

    public void deleteUserGroupReferences(Long groupId) {
        // Delete all records in user_groups that reference the groupId
        userGroupRepository.removeAllUsersFromGroup(groupId); // Assuming you have a UserGroupRepository
    }
}
