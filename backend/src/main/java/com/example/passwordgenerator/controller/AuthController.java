package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.UserDto;
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
    public String register(@RequestBody UserDto userDTO) {
        return loginService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserDto userDTO) {
        return loginService.loginUser(userDTO);
    }


//    //Додав для тесту
//    @GetMapping("/")
//    public String home() {
//        return "Welcome to the Password Generator API. Use /passwordGenerator/auth/register or /passwordGenerator/auth/login for authentication.";
//    }


}
