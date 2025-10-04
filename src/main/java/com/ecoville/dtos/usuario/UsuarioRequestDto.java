package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.enums.Perfil;

public record UsuarioRequestDto (
    String nomeUsuario,
    String senha,
    Perfil perfil,
    EnderecoRequestDto endereco
){}
