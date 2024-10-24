package ltu.group06.work.resoucesmanager.controller;


import ltu.group06.work.resoucesmanager.dto.RegisterRequest;
import ltu.group06.work.resoucesmanager.service.RegisterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest registerRequest) {
        return registerService.registerUser(registerRequest);
    }
}
