package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.enums.Perfil;

public record UsuarioResponseDto (
    Long id,
    String nome,
    String nomeUsuario,
    String email,
    String senha,
    Perfil perfil,
    EnderecoResponseDto endereco
){}