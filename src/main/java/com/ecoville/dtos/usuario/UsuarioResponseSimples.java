package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.enums.Perfil;

public record UsuarioResponseSimples(
        Long id,
        String nomeUsuario,
        Perfil perfil,
        EnderecoResponseDto endereco
) {
}
