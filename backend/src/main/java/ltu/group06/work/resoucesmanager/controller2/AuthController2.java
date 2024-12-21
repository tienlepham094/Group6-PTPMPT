package ltu.group06.work.resoucesmanager.controller2;

import jakarta.servlet.http.HttpSession;
import ltu.group06.work.resoucesmanager.dto.LoginRequest;
import ltu.group06.work.resoucesmanager.entity.User2;
import ltu.group06.work.resoucesmanager.service2.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User2 user) {
        if (userService.checkIfUsernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }

        // Mã hóa mật khẩu.
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userService.createUser(user);

        return ResponseEntity.ok("Registration successful!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User2 user = userService.findByUsername(loginRequest.getUsername());

        if (user == null || !new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
        }

        // Lưu trạng thái vào session.
        session.setAttribute("loggedInUser", user);

        return ResponseEntity.ok("Login successful!");
    }
}
