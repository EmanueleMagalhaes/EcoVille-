package com.ecoville.mappers;

import java.util.List;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;

public class UsuarioMapper {

    private UsuarioMapper(){};

    public static Usuario praEntidade(UsuarioRequestDto dto){

        Usuario usuario = new Usuario();

        usuario.setNome(dto.nome());
        usuario.setEndereco(EnderecoMapper.praEntidade(dto.endereco()));
        usuario.setNomeUsuario(dto.nomeUsuario());
        usuario.setSenha(dto.senha());

        return usuario;
    }

    public static UsuarioResponseDto praDto(Usuario usuario){{
        return new UsuarioResponseDto(
            usuario.getId(),
            usuario.getNome(),
            usuario.getNomeUsuario(),
            usuario.getEmail(),
            usuario.getSenha(),
            usuario.getPerfil(),
            EnderecoMapper.praDto(usuario.getEndereco())
        );
    }
    }

    public static List<UsuarioResponseDto> dtoList(List<Usuario>usuarios){

        return usuarios.stream()
        .map(UsuarioMapper::praDto)
        .toList();

} 

}

}

