package com.example.passwordgenerator.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordDto {

    @NotNull
    private Integer length;

    @NotNull
    private Integer flags;

}
