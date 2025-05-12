package com.example.passwordgenerator.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SavePasswordDTO {

    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String purpose;
}
