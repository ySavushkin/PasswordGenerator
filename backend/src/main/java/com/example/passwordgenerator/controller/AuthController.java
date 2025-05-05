package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
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


//    //Додав для тесту
//    @GetMapping("/")
//    public String home() {
//        return "Welcome to the Password Generator API. Use /passwordGenerator/auth/register or /passwordGenerator/auth/login for authentication.";
//    }


}
