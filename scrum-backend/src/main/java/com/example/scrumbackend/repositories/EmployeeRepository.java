// src/main/java/com/example/scrumbackend/repositories/EmployeeRepository.java
package com.example.scrumbackend.repositories;

import com.example.scrumbackend.models.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository extends MongoRepository<Employee, String> {
}
