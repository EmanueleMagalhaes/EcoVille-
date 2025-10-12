package com.ecoville.dtos.login;

import lombok.Data;

@Data
public class LoginRequestDto {

    private String nomeUsuario;
    private String senha;

}
