package com.example.passwordgenerator.service;

import com.example.passwordgenerator.dto.UserDto;

public interface LoginService {

    String loginUser(UserDto userDTO);
    String registerUser(UserDto userDTO);

}
