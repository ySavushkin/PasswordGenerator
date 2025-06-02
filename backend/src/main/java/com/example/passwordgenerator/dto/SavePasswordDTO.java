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
public class SavePasswordDTO {

    @NotNull
    private String email;

    @NotNull
    private String password;

    private String note;
}
