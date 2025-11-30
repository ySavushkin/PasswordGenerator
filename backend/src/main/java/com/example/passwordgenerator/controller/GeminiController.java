package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passwordGenerator/ai")
public class GeminiController {
    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public String askGeminiAPI(@RequestBody String prompt) {
        return geminiService.askGemini(prompt);
    }
}
