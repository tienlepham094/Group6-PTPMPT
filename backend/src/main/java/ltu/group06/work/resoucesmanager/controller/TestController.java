package ltu.group06.work.resoucesmanager.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class TestController {
    @GetMapping("/ping")
    public String ping(){
        return "Group 6 is working!";
    }
}