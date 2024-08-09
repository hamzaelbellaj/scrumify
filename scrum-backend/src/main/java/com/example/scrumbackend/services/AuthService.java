package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Role;
import com.example.scrumbackend.models.User;
import com.example.scrumbackend.repositories.RoleRepository;
import com.example.scrumbackend.repositories.UserRepository;
import com.example.scrumbackend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.scrumbackend.dto.RegisterRequest;



import java.util.Optional;
import java.util.Set;

import java.util.HashSet;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(RegisterRequest registerRequest) {
        // Log les détails de la requête
        System.out.println("Registering user with username: " + registerRequest.getUsername() +
                " and role: " + registerRequest.getRole());

        // Vérifier si l'utilisateur existe déjà
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }

        // Créer un nouvel utilisateur
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Déterminer le rôle de l'utilisateur
        Set<Role> roles = new HashSet<>();
        try {
            Role role = roleRepository.findByName(registerRequest.getRole())
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(role);
        } catch (RuntimeException e) {
            System.out.println("Role not found: " + e.getMessage());
            throw e;
        }

        user.setRoles(roles);

        // Enregistrer l'utilisateur
        return userRepository.save(user);
    }


    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public String generateToken(UserDetails userDetails) {
        return jwtUtil.generateToken(userDetails);
    }
}
