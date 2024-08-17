package com.example.scrumbackend.services;

import com.example.scrumbackend.models.Employee;
import com.example.scrumbackend.models.Role;
import com.example.scrumbackend.repositories.EmployeeRepository;
import com.example.scrumbackend.repositories.RoleRepository;
import com.example.scrumbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        // Encode the password
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));

        // Assign the role 'Employee'
        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName("Employee")
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(role);
        employee.setRoles(roles);

        return employeeRepository.save(employee);
    }


    public Employee updateEmployee(String id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setStatus(employeeDetails.getStatus());
        employee.setUsername(employeeDetails.getUsername());

        // Ne réencoder le mot de passe que s'il est modifié
        if (employeeDetails.getPassword() != null && !employeeDetails.getPassword().isEmpty()) {
            employee.setPassword(passwordEncoder.encode(employeeDetails.getPassword()));
        }

        // Vérifier et assigner les rôles si nécessaire
        if (employeeDetails.getRoles() == null || employeeDetails.getRoles().isEmpty()) {
            Set<Role> roles = new HashSet<>();
            Role role = roleRepository.findByName("Employee")
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(role);
            employee.setRoles(roles);
        } else {
            employee.setRoles(employeeDetails.getRoles());
        }

        // Mettre à jour les données de l'image
        if (employeeDetails.getProfileImageData() != null) {
            employee.setProfileImageData(employeeDetails.getProfileImageData());
        }

        return employeeRepository.save(employee);
    }


    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }

    public long getTotalEmployees() {
        return employeeRepository.count();
    }
}
