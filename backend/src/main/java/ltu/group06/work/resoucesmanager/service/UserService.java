package ltu.group06.work.resoucesmanager.service;


import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final SecureRandom random = new SecureRandom();

    public User getUserById(int userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findByUsernameOrEmail(String usernameOrEmail) {
        return userRepository.findByUsernameOrEmail(usernameOrEmail);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User registerUser(String username, String email, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(encodedPassword);
        user.setRole("user");
        return userRepository.save(user);
    }

    public String generateOTP() {
        int otpLength = 6;
        StringBuilder otp = new StringBuilder(otpLength);
        for (int i = 0; i < otpLength; i++) {
            // Tạo số từ 0-9 ngẫu nhiên
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public User updateUser(int id, User userDetails) {
        User user = getUserById(id);
        if (user != null) {
            user.setUsername(userDetails.getUsername());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        }
        return null;
    }
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public Optional<User> searchUsersByName(String name) {
        return userRepository.findByUsername(name);

    public String updatePassword(String usernameOrEmail, String currentPassword, String newPassword) {
        if (!StringUtils.hasText(newPassword) || newPassword.length() < 8) {
            return "New password must be at least 8 characters long.";
        }

        Optional<User> userOptional = findByUsernameOrEmail(usernameOrEmail);
        if (!userOptional.isPresent()) {
            return "User not found.";
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            return "Current password is incorrect.";
        }

        if (passwordEncoder.matches(newPassword, user.getPasswordHash())) {
            return "New password cannot be the same as the current password.";
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return "success";

    }
}