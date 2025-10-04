package com.ecoville.mappers;

import java.util.List;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;

public class UsuarioMapper {

    private UsuarioMapper(){};


    public static Usuario praEntidade(UsuarioRequestDto dto){

        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(dto.nomeUsuario());
        usuario.setSenha(dto.senha());
        usuario.setPerfil(dto.perfil());

        return usuario;
    }

    public static UsuarioResponseDto praDto(Usuario usuario){
        return new UsuarioResponseDto(
            usuario.getId(),
            usuario.getNomeUsuario(),

            usuario.getPerfil()
        
        );
    
    }

    public static List<UsuarioResponseDto> listaDtos(List<Usuario>usuarios){

        return usuarios.stream()
        .map(UsuarioMapper::praDto)
        .toList();

} 

}
