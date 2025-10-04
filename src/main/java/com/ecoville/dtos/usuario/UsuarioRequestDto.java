package com.ecoville.dtos.usuario;


import com.ecoville.enums.Perfil;

import jakarta.validation.constraints.NotBlank;

public record UsuarioRequestDto (
    @NotBlank(message = "nome vazio")
    String nome,
    @NotBlank(message = "nome de usuario vazio")
    String nomeUsuario,
    @NotBlank(message = "email vazio")
    String email,
    @NotBlank(message = "mensagem vazia")
    String senha,
    @NotBlank(message = "perfil vazio")
    Perfil perfil
    //EnderecoRequestDto endereco
){}
