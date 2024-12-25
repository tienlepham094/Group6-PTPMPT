package ltu.group06.work.resoucesmanager.controller2;

import jakarta.servlet.http.HttpSession;
import ltu.group06.work.resoucesmanager.service2.UserService2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional; 

@RestController
@RequestMapping("/auth/api/users")
public class UserController2 {

    @Autowired
    private UserService2 userService;

    @PostMapping
    public ResponseEntity<User2> createUser(@RequestBody User2 user) {
        User2 createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User2> getUserById(@PathVariable Long id) {
        Optional<User2> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get")
    public ResponseEntity<List<User2>> getAllUser() {
        List<User2> users = userService.getAllUser();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/exists-email")
    public ResponseEntity<Boolean> checkIfEmailExists(@RequestParam String email) {
        boolean exists = userService.checkIfEmailExists(email);
        return ResponseEntity.ok(exists);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/user/info")
    public ResponseEntity<User2> getUserInfo(HttpSession session) {
        User2 user = (User2) session.getAttribute("loggedInUser");
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

}
