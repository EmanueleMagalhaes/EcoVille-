package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.enums.Perfil;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRequestDto (

    @NotBlank(message = "nome de usuario é obrigatório")
    String nomeUsuario,

    @NotBlank(message = "senha é obrigatório")
    String senha,

    @NotNull(message = "perfil de usuario é obrigatório")
    Perfil perfil,
    
    EnderecoRequestDto endereco
){}