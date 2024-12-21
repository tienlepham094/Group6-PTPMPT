package ltu.group06.work.resoucesmanager.service2;

import ltu.group06.work.resoucesmanager.entity.User2;
import ltu.group06.work.resoucesmanager.repository2.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User2 createUser(User2 user) {
        return userRepository.save(user);
    }
    public User2 findByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    public Optional<User2> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User2> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkIfEmailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    public boolean checkIfUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
