package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.enums.Perfil;

public record UsuarioRequestDto (
    String nome,
    String nomeUsuario,
    String email,
    String senha,
    Perfil perfil,
    EnderecoRequestDto endereco
){}
