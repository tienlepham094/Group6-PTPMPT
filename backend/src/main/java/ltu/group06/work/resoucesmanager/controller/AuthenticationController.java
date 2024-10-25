package ltu.group06.work.resoucesmanager.controller;

import ltu.group06.work.resoucesmanager.entity.User;
import ltu.group06.work.resoucesmanager.service.EmailService;
import ltu.group06.work.resoucesmanager.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private UserService userService;
    private EmailService emailService;

    public void AuthController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        User user = userService.registerUser(username, email, password);
        String otp = userService.generateOTP();

        try {
            emailService.sendOTP(email, otp);
            return "User registered successfully. Check your email for the OTP.";
        } catch (MessagingException e) {
            return "Failed to send OTP. Please try again.";
        }
    }
}