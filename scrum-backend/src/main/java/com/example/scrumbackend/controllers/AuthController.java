package com.example.scrumbackend.controllers;

import com.example.scrumbackend.dto.RegisterRequest;
import com.example.scrumbackend.models.User;
import com.example.scrumbackend.models.Role;
import com.example.scrumbackend.services.AuthService;
import com.example.scrumbackend.services.CustomUserDetailsService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User registeredUser = authService.registerUser(registerRequest);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody @NotNull User user) {
        Optional<User> foundUserOpt = authService.findByUsername(user.getUsername());
        if (foundUserOpt.isPresent()) {
            User foundUser = foundUserOpt.get();
            if (authService.checkPassword(user.getPassword(), foundUser.getPassword())) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(foundUser.getUsername());
                String token = authService.generateToken(userDetails);
                return ResponseEntity.ok(new LoginResponse(foundUser.getRoles(), token, foundUser.getId())); // Ajoutez l'ID
            }
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }
}

class LoginResponse {
    private Set<Role> roles;
    private String token;
    private String userId; // Ajoutez cette ligne

    public LoginResponse(Set<Role> roles, String token, String userId) {
        this.roles = roles;
        this.token = token;
        this.userId = userId; // Modifiez le constructeur
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public String getToken() {
        return token;
    }

    public String getUserId() { // Ajoutez ce getter
        return userId;
    }
}