package ltu.group06.work.resoucesmanager.dto;


public class LoginRequest {

    private String username; // Username or email provided by the user
    private String password; // Password provided by the user

    // Default constructor
    public LoginRequest() {
    }

    // Parameterized constructor
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // Optional: Override toString for debugging purposes
    @Override
    public String toString() {
        return "LoginRequest{" +
                "username='" + username + '\'' +
                ", password='[PROTECTED]'" + // Avoid printing the password directly
                '}';
    }
}
