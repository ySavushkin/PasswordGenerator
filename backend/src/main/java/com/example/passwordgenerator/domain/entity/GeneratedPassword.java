package com.example.passwordgenerator.domain.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class GeneratedPassword {

    private String password;

}
