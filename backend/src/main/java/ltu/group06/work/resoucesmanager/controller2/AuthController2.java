//package ltu.group06.work.resoucesmanager.controller2;
//
//import jakarta.servlet.http.HttpSession;
//import ltu.group06.work.resoucesmanager.dto.LoginRequest;
//import ltu.group06.work.resoucesmanager.service2.UserService2;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/auth")
//@CrossOrigin(origins = "*") // Cho phép tất cả các nguồn gửi request
//public class AuthController2 {
//
//    @Autowired
//    private UserService2 userService;
//
//    @PostMapping("/register")
//    public ResponseEntity<String> register(@RequestBody User2 user) {
//        if (userService.checkIfUsernameExists(user.getUsername())) {
//            return ResponseEntity.badRequest().body("Username already exists!");
//        }
//
//        // Mã hóa mật khẩu.
//        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
//        userService.createUser(user);
//
//        logService.createLog(
//                user.getUserId(),
//                null,
//                "REGISTER",
//                "User registered with username: " + user.getUsername()
//        );
//
//        return ResponseEntity.ok("Registration successful!");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
//        User2 user = userService.findByUsername(loginRequest.getUsername());
//
//        if (user == null || !new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password!");
//        }
//
//        // Lưu trạng thái vào session.
//        session.setAttribute("loggedInUser", user);
//
//        logService.createLog(
//                user.getUserId(),
//                null,
//                "LOGIN",
//                "User logged in with username: " + user.getUsername()
//        );
//
//        return ResponseEntity.ok(user);
//    }
//}
