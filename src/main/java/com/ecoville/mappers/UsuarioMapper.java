package com.ecoville.mappers;

import java.util.ArrayList;
import java.util.List;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.dtos.usuario.UsuarioResponseSimples;
import com.ecoville.entities.SolicitacaoColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.exceptions.BadRequestException;

public class UsuarioMapper {

    private UsuarioMapper(){};


    private static Perfil traduzPerfil(String dto){

        Perfil perfil = null;
        try{
        perfil = Perfil.valueOf(dto.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new BadRequestException("valor de perfil não aceito: " + e);
        }

        return perfil;
    }


    public static Usuario praEntidade(UsuarioRequestDto dto){

        Usuario usuario = new Usuario();
        usuario.setNomeUsuario(dto.getNomeUsuario());
        usuario.setSenha(dto.getSenha());
        usuario.setPerfil(traduzPerfil(dto.getPerfil()));

        List<SolicitacaoColeta> lista = new ArrayList<SolicitacaoColeta>();

        usuario.setSolicitacoes(lista);

        return usuario;
    }

    public static UsuarioResponseDto praDto(Usuario usuario){
        return new UsuarioResponseDto(
            usuario.getId(),
            usuario.getNomeUsuario(),
            usuario.getPerfil(),
           EnderecoMapper.praDto(usuario.getEndereco()),
           SolicitacaoColetaMapper.praListaDto(usuario.getSolicitacoes())
        );
    
    }

    public static List<UsuarioResponseDto> listaDtos(List<Usuario>usuarios){

        return usuarios.stream()
        .map(UsuarioMapper::praDto)
        .toList();
    }

    public static UsuarioResponseSimples praDtoColeta(Usuario usuario){
        return new UsuarioResponseSimples(
                usuario.getId(),
                usuario.getNomeUsuario(),
                usuario.getPerfil(),
                EnderecoMapper.praDto(usuario.getEndereco())
        );
    }

}
