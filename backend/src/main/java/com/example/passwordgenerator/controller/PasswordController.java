package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.SavePasswordDTO;
import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.service.LoginService;
import com.example.passwordgenerator.service.PasswordService;
import com.example.passwordgenerator.service.UserService;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/passwordGenerator/password")
public class PasswordController {

    private final PasswordService passwordService;
    private final UserService userService;

    @Autowired
    public PasswordController(PasswordService passwordService, UserService userService) {
        this.passwordService = passwordService;
        this.userService = userService;
    }

    @PostMapping("/save")
    public String savePassword(@RequestBody SavePasswordDTO savePasswordDTO) {
        Optional<User> currentUser = userService.findUserByEmail(savePasswordDTO.getEmail());

        if (!currentUser.isPresent()) {
            return "User not found";
        }

        Password newPassword = new Password();
        newPassword.setPasswordHash(savePasswordDTO.getPassword());
        newPassword.setUser(currentUser.get());
        newPassword.setSource(savePasswordDTO.getPurpose());

        passwordService.savePassword(newPassword);

        return "Success";
    }

    @GetMapping("/email")
    public List<Password> getPasswordsByUser(@RequestParam String email) {
        Optional<User> userOptional = userService.findUserByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.println("user empty");
            return Collections.emptyList();
        }

        User user = userOptional.get();
        List<Password> passwords = passwordService.getPasswordsByUser(user);

        if (passwords.isEmpty()) {
            System.out.println("collection empty");
            return Collections.emptyList();
        }

        return passwords;
    }
}
