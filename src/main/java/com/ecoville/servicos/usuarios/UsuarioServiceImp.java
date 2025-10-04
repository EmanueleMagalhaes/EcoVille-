package com.ecoville.servicos.usuarios;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.UsuarioMapper;
import com.ecoville.repositories.UsuarioRepositorio;
// ...existing code...

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImp implements UsuarioServices{

    private final UsuarioRepositorio repositorio;
    private final UsuarioMapper mapper;

    @Override
    @Transactional
    public UsuarioResponseDto criar(UsuarioRequestDto dto){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }

    Usuario usuario = mapper.praEntidade(dto);

    // O Endereco é mapeado no próprio mapper (usa EnderecoMapper) e, com cascade=ALL, será persistido junto ao Usuario
    usuario = repositorio.save(usuario);

        return mapper.praDto(usuario);
    }

    @Override
    public UsuarioResponseDto porId(Long id){

        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");        }

        return mapper.praDto(repositorio.findById(id).get());

    }

    @Override
    public List<UsuarioResponseDto> todos(){

        return mapper.listaDto(repositorio.findAll());
    }

    @Override
    public UsuarioResponseDto editar(UsuarioRequestDto dto, Long id){


        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        }

        Usuario usuario = mapper.praEntidade(dto);

        usuario.setId(id);

        usuario.setEndereco(repositorio.findById(id).get().getEndereco());

        usuario = repositorio.save(usuario);

        return mapper.praDto(usuario);
    }

    @Override
    public void excluir(Long id){
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        };

        repositorio.deleteById(id);
    };
}



