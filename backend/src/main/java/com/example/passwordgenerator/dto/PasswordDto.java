package com.example.passwordgenerator.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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
