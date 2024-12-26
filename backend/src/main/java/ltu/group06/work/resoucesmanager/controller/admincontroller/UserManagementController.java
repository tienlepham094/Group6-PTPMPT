//package ltu.group06.work.resoucesmanager.controller.admincontroller;
//
//import ltu.group06.work.resoucesmanager.dto.UserDto;
//import ltu.group06.work.resoucesmanager.entity.User;
//import ltu.group06.work.resoucesmanager.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/app/admin/user_management")
//@CrossOrigin(origins = "*")
//public class UserManagementController {
//
//    @Autowired
//    private UserService userService;
//
//    // List all users
//    @GetMapping("/getall")
//    public ResponseEntity<List<UserDto>> getAllUsers() {
//        List<User> users = userService.getAllUsers();
//        List<UserDto> userDtos = users.stream()
//                .map(user -> new UserDto(
//                        user.getId(),
//                        user.getUsername(),
//                        user.getEmail(),
//                        user.getPassword(),
//                        user.getRole()))
//                .collect(Collectors.toList());
//
//        return ResponseEntity.ok(userDtos);
//    }
//
//    // Get a user by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<UserDto> getUserById(@PathVariable int id) {
//        User user = userService.getUserById(id);
//        if (user == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        UserDto userDto = new UserDto(
//                user.getId(),
//                user.getUsername(),
//                user.getEmail(),
//                user.getPassword(),
//                user.getRole());
//
//        return ResponseEntity.ok(userDto);
//    }
//
//    // Update a user
//    @PutMapping("/update/{id}")
//    public ResponseEntity<UserDto> updateUser(@PathVariable int id, @RequestBody User userDetails) {
//        User updatedUser = userService.updateUser(id, userDetails);
//        if (updatedUser == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        UserDto userDto = new UserDto(
//                updatedUser.getId(),
//                updatedUser.getUsername(),
//                updatedUser.getEmail(),
//                updatedUser.getPassword(),
//                updatedUser.getRole());
//        return ResponseEntity.ok(userDto);
//    }
//
//    // Delete a user
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteUser(@PathVariable int id) {
//        boolean isDeleted = userService.deleteUser(id);
//        if (!isDeleted) {
//            return ResponseEntity.ok("User deleted successfully.");
//        }
//        return ResponseEntity.ok("User deleted successfully.");
//    }
//
//    // Search users by email or username
//    @GetMapping("/search")
//    public ResponseEntity<List<UserDto>> searchUsers(@RequestParam(required = false) String email,
//                                                     @RequestParam(required = false) String username) {
//        List<User> users = userService.searchUsers(email, username);
//        if (users.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//
//        List<UserDto> userDtos = users.stream()
//                .map(user -> new UserDto(
//                        user.getUserId(),
//                        user.getUsername(),
//                        user.getEmail(),
//                        user.getPasswordHash(),
//                        user.getRole()))
//                .collect(Collectors.toList());
//
//        return ResponseEntity.ok(userDtos);
//    }
//}
