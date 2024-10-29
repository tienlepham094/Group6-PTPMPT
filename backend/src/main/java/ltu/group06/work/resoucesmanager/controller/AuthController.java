package ltu.group06.work.resoucesmanager.controller;

import jakarta.mail.MessagingException;
import ltu.group06.work.resoucesmanager.dto.LoginRequest;
import ltu.group06.work.resoucesmanager.dto.RegisterRequest;
import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.EmailService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/app")
@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // Đăng ký người dùng với JSON body
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        try {
            if (userService.findByUsername(request.getUsername()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Username already exists.");
            }
            if (userService.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email already exists.");
            }
            // Lưu thông tin người dùng vào database
            userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());

            return ResponseEntity.ok("Registration successful! Please activate your account via Telegram bot.");

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Database error: Duplicate entry detected.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred. Please try again later.");
        }
    }


    // Xử lý đăng nhập người dùng với JSON body mà không cần DTO
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest,
                                        HttpServletRequest request) {

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (username == null || username.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vui lòng nhập tên đăng nhập.");
        }
        if (password == null || password.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Vui lòng nhập mật khẩu.");
        }

        Optional<User> userOptional = userService.findByUsername(username);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên đăng nhập không đúng.");
        }

        User user = userOptional.get();

        if (!userService.checkPassword(password, user.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mật khẩu không chính xác.");
        }

        // Nếu đăng nhập thành công, lưu role vào session
        HttpSession session = request.getSession();
        session.setAttribute("user", user);
        session.setAttribute("role", user.getRole());
        // Hết hạn session sau 15 phút
        session.setMaxInactiveInterval(15 * 60);

        String targetUrl = getTargetUrl(user.getRole());
        return ResponseEntity.ok(targetUrl);
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
}