package ltu.group06.work.resoucesmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/app")
public class AppTestController {

    // Endpoint cho Home User
    @GetMapping("/home")
    public String home() {
        return "This is home user";
    }

    // Endpoint cho Admin Dashboard
    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "Đây là admin dashboard";
    }
}