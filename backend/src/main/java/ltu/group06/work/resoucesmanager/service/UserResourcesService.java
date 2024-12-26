package ltu.group06.work.resoucesmanager.service;

import ltu.group06.work.resoucesmanager.entity.Resource;
import ltu.group06.work.resoucesmanager.entity.UserResources;
import ltu.group06.work.resoucesmanager.repository.UserResourcesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserResourcesService {

    @Autowired
    private UserResourcesRepository userResourcesRepository;

    // Thêm hoặc cập nhật tài nguyên của người dùng
    public UserResources allocateResource(Long userId, Resource.ResourceType resourceType, int quantity) {
        UserResources userResources = userResourcesRepository.findByUserIdAndResourceType(userId, resourceType);

        if (userResources != null) {
            // Nếu tài nguyên đã tồn tại, cập nhật số lượng
            userResources.setQuantity(userResources.getQuantity() + quantity);
        } else {
            // Nếu chưa có tài nguyên, tạo mới
//            userResources = new UserResources(userId, resourceType, quantity);
        }

        return userResourcesRepository.save(userResources);
    }

    // Lấy tài nguyên của người dùng
    public UserResources getUserResources(Long userId, Resource.ResourceType resourceType) {
        return userResourcesRepository.findByUserIdAndResourceType(userId, resourceType);
    }
    public List<UserResources> getAllUserResources(Long userId) {
        return userResourcesRepository.findByUserId(userId);
    }
    // Giải phóng tài nguyên của người dùng
    public UserResources releaseResource(Long userId, Resource.ResourceType resourceType, int quantity) {
        UserResources userResources = userResourcesRepository.findByUserIdAndResourceType(userId, resourceType);

        if (userResources != null && userResources.getQuantity() >= quantity) {
            userResources.setQuantity(userResources.getQuantity() - quantity);
            return userResourcesRepository.save(userResources);
        }

        return null; // Nếu không đủ tài nguyên để giải phóng
    }
}
