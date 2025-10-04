package com.ecoville.dtos.usuario;


import com.ecoville.enums.Perfil;

public record UsuarioResponseDto (
    Long id,
    String nome,
    String nomeUsuario,
    String email,
    Perfil perfil
){}