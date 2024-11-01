package ltu.group06.work.resoucesmanager.controller;

import org.springframework.cglib.core.Local;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@RestController
@RequestMapping("/app")
public class AppTestController {

    // Endpoint cho Home User
    @GetMapping("/app/home")
    public String home() {
        return "This is home user";
    }

    // Endpoint cho Admin Dashboard
    @GetMapping(".app/admin/dashboard")
    public String adminDashboard() {
        return "Đây là admin dashboard";
    }

    public static void main(String[] args) {
        LocalDateTime startTime = LocalDateTime.now();
        System.out.println("Start time: " + startTime);
    }
    public static LocalDateTime getsR(){
        return LocalDateTime.now();
    }

}