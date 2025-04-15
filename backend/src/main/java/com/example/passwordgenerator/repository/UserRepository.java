package com.example.passwordgenerator.repository;

import com.example.passwordgenerator.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
