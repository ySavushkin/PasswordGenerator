package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.dto.PasswordDto;
import com.example.passwordgenerator.domain.entity.GeneratedPassword;
import com.example.passwordgenerator.service.PasswordGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/passwordGenerator")
@CrossOrigin(origins = "http://localhost:5173")
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<GeneratedPassword> generatePassword(@RequestBody PasswordDto passwordDto) {
        return new ResponseEntity<>(
                new GeneratedPassword(passwordGeneratorService.generate(passwordDto.getLength(), passwordDto.getFlags())), HttpStatus.OK);
    }

}
