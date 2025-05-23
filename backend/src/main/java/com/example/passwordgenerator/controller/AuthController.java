package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;
import com.example.passwordgenerator.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:80")
@RequestMapping("/passwordGenerator/auth")
public class AuthController {

    private final LoginService loginService;

    @Autowired
    public AuthController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/register")
    public ResponseDto register(@RequestBody UserDto userDTO) {
        return loginService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody UserDto userDTO) {
        return loginService.loginUser(userDTO);
    }
}
