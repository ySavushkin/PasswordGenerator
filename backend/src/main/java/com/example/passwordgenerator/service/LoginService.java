package com.example.passwordgenerator.service;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;

public interface LoginService {

    ResponseDto loginUser(UserDto userDTO);
    ResponseDto registerUser(UserDto userDTO);

}
