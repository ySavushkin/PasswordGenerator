package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.PasswordRecord;
import com.example.passwordgenerator.dto.SavePasswordDTO;
import com.example.passwordgenerator.domain.entity.Password;
import com.example.passwordgenerator.domain.entity.User;
import com.example.passwordgenerator.service.PasswordService;
import com.example.passwordgenerator.service.UserService;

import java.util.*;

import com.example.passwordgenerator.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/passwordGenerator/password")
public class PasswordController {

    private final PasswordService passwordService;

    private final UserService userService;

    private final PasswordUtils passwordUtils;

    @Autowired
    public PasswordController(
            PasswordService passwordService,
            UserService userService,
            PasswordUtils passwordUtils) {
        this.passwordService = passwordService;
        this.userService = userService;
        this.passwordUtils = passwordUtils;
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
        newPassword.setSource(savePasswordDTO.getNote());

        passwordService.savePassword(newPassword);

        return "Success";
    }

    @GetMapping("/email")
    public List<PasswordRecord> getPasswordsByUser(@RequestParam String email) {
        Optional<User> userOptional = userService.findUserByEmail(email);

        if (userOptional.isEmpty()) {
            System.out.println("user empty");
            return Collections.emptyList();
        }

        User user = userOptional.get();
        List<Password> passwords = passwordService.getPasswordsByUser(user);

        List<PasswordRecord> passwordRecords = new ArrayList<>();
        for(Password password : passwords) {
            passwordRecords.add(new PasswordRecord(password.getPasswordHash(), password.getSource()));
        }

        if (passwordRecords.isEmpty()) {
            System.out.println("collection empty");
            return Collections.emptyList();
        }

        return passwordRecords;
    }

    @PostMapping("/strength")
    public int getPasswordStrength(@RequestBody String password) {
        return passwordUtils.evaluatePasswordStrength(password);
    }
}
