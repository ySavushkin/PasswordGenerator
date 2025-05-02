package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/passwordGenerator/auth")
public class AuthController {

    private final LoginService loginService;

    @Autowired
    public AuthController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
        return loginService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        return loginService.loginUser(userDTO);
    }
}
