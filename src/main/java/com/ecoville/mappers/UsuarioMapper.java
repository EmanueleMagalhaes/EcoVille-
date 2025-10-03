package com.ecoville.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    public Usuario praEntidade(UsuarioRequestDto dto);

    public UsuarioResponseDto praDto(Usuario usuario);

    public List<UsuarioResponseDto> listaDto(List<Usuario>usuarios);
} 
