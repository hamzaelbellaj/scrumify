package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Role;
import com.example.scrumbackend.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Optional<Role> findByName(String name) {
        return roleRepository.findByName(name); // Méthode pour trouver un rôle par son nom
    }

    // Autres méthodes si nécessaire...
}
