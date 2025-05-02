package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.PasswordDTO;
import com.example.passwordgenerator.domain.entity.GeneratedPassword;
import com.example.passwordgenerator.service.PasswordGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/passwordGenerator")
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;

    @Autowired
    public PasswordGeneratorController(PasswordGeneratorService passwordGeneratorService) {
        this.passwordGeneratorService = passwordGeneratorService;
    }

    @PostMapping("/generate")
    public ResponseEntity generatePassword(@RequestBody PasswordDTO passwordDTO) {
        return new ResponseEntity<>(
                new GeneratedPassword(passwordGeneratorService.generate(passwordDTO.getLength(), passwordDTO.getFlags()))
                , HttpStatus.OK);
    }

}
