package com.example.passwordgenerator.controller;

import com.example.passwordgenerator.DTO.UserDTO;
import com.example.passwordgenerator.service.LoginService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class AuthControllerTest {

    private MockMvc mockMvc;
    private LoginService loginService;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        loginService = Mockito.mock(LoginService.class);
        AuthController authController = new AuthController(loginService);
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void register_ShouldReturnSuccessMessage() throws Exception {
        UserDTO userDTO = new UserDTO("testuser", "test@example.com", "password123");

        when(loginService.registerUser(any(UserDTO.class)))
                .thenReturn("Registration successful");

        mockMvc.perform(post("/passwordGenerator/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Registration successful"));
    }

    @Test
    void login_ShouldReturnSuccessMessage() throws Exception {
        UserDTO userDTO = new UserDTO("testuser", "test@example.com", "password123");

        when(loginService.loginUser(any(UserDTO.class)))
                .thenReturn("Login successful");

        mockMvc.perform(post("/passwordGenerator/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("Login successful"));
    }
}
