package com.ecoville.servicos.usuarios;

import java.util.List;

import com.ecoville.entities.Endereco;
import com.ecoville.mappers.EnderecoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.UsuarioMapper;
import com.ecoville.repositories.UsuarioRepositorio;


@Service
public class UsuarioServiceImp implements UsuarioServices{

    @Autowired
    private UsuarioRepositorio repositorio;

    @Override
    public UsuarioResponseDto criar(UsuarioRequestDto dto){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        Endereco endereco = EnderecoMapper.praEntidade(dto.getEndereco());

        usuario.setEndereco(endereco);

        usuario = repositorio.save(usuario);

        return UsuarioMapper.praDto(usuario);

    }

    @Override
    public UsuarioResponseDto porId(Long id){

        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado"); }

        return UsuarioMapper.praDto(repositorio.findById(id).get());

    }

    @Override
    public List<UsuarioResponseDto> todos(){

        return UsuarioMapper.listaDtos(repositorio.findAll());
    }

    @Override
    public UsuarioResponseDto editar(UsuarioRequestDto dto, Long id){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        usuario.setId(id);

        //usuario.setEndereco(repositorio.findById(id).get().getEndereco());

        Endereco endereco = repositorio.findById(id).get().getEndereco();
        usuario.setEndereco(endereco);

        usuario = repositorio.save(usuario);

        return UsuarioMapper.praDto(usuario);
    }

    @Override
    public void excluir(Long id){
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        };

        repositorio.deleteById(id);
    };
}



