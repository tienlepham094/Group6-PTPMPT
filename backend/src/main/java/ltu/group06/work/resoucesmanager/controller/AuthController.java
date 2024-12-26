package ltu.group06.work.resoucesmanager.controller;

import ltu.group06.work.resoucesmanager.dto.*;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.repository.UserRepository;
import ltu.group06.work.resoucesmanager.service.EmailService;
import ltu.group06.work.resoucesmanager.service.LogService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private LogService logService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/get-token")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Welcome to the authentication service.");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userService.checkIfUsernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        // Mã hóa mật khẩu.
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.createUser(user);

        logService.createLog(
                Math.toIntExact(user.getId()),
                null,
                "REGISTER",
                "User registered with username: " + user.getUsername()
        );
        System.out.printf("Register success");

        return ResponseEntity.ok("Registration successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userService.findByUsername(loginRequest.getUsername());

        if (user == null || !new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
        }

        // Lưu trạng thái vào session.
        session.setAttribute("loggedInUser", user);

        logService.createLog(
                Math.toIntExact(user.getId()),
                null,
                "LOGIN",
                "User logged in with username: " + user.getUsername()
        );

        return ResponseEntity.ok(user);
    }


    // Check url
    private String getTargetUrl(String role) {
        switch (role.toUpperCase()) {
            case "ADMIN":
                return "/app/admin/dashboard";
            case "USER":
                return "/app/home";
            default:
                throw new IllegalStateException("Role không hợp lệ: " + role);
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Lấy session nếu tồn tại
        if (session != null) {
            session.invalidate(); // Hủy session
        }
        return ResponseEntity.ok("Đăng xuất thành công.");
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordChangeDto passwordUpdateDTO) {
        String result = userService.updatePassword(
                passwordUpdateDTO.getUsernameOrEmail(),
                passwordUpdateDTO.getCurrentPassword(),
                passwordUpdateDTO.getNewPassword()
        );

        if ("success".equals(result)) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

//    @PostMapping("/change-password")
//    public ResponseEntity<?> updatePassword(@RequestBody PasswordChangeDto passwordUpdateDTO) {
//        String result = userService.updatePassword(passwordUpdateDTO.getUsernameOrEmail(), passwordUpdateDTO.getCurrentPassword(), passwordUpdateDTO.getNewPassword());
//
//        if ("success".equals(result)) {
//            return ResponseEntity.ok("Password updated successfully.");
//        } else {
//            return ResponseEntity.badRequest().body(result);
//        }
//    }
//

//    @GetMapping("/user-id")
//    public ResponseEntity<String> getCurrentUserId() {
//        // Retrieve the currently authenticated user
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//
//        if (principal instanceof UserDetails) {
//            String username = ((UserDetails) principal).getUsername();
//
//            // Query user by username
//            Optional<User> userOptional = userService.findByUsername(username);
//            if (userOptional.isPresent()) {
//                int userId = userOptional.get().getUserId();
//                return ResponseEntity.ok("User ID: " + userId);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
//            }
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated.");
//        }
//    }
}