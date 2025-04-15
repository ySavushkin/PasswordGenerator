package com.example.passwordgenerator.service;

import com.example.passwordgenerator.DTO.UserDTO;

public interface LoginService {

    String loginUser(UserDTO userDTO);
    String registerUser(UserDTO userDTO);
}
