package com.example.passwordgenerator.service;

import com.example.passwordgenerator.dto.ResponseDto;
import com.example.passwordgenerator.dto.UserDto;
import jakarta.servlet.http.HttpServletResponse;

public interface LoginService {

    ResponseDto loginUser(UserDto userDTO, HttpServletResponse response);
  
    ResponseDto registerUser(UserDto userDTO);

}
