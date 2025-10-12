package com.ecoville.dtos.login;

import com.ecoville.dtos.usuario.UsuarioResponseDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {

    private String type;
    private String token;
    private UsuarioResponseDto usuario;

}
