package ltu.group06.work.resoucesmanager.controller;

import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegisterRequest registerRequest) throws MessagingException {
        return registerService.registerUser(registerRequest);
    }
}
