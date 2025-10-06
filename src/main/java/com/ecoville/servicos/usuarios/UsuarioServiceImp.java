package com.ecoville.servicos.usuarios;

import java.util.List;

import com.ecoville.entities.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.UsuarioMapper;
import com.ecoville.repositories.UsuarioRepositorio;
//import com.ecoville.servicos.enderecos.EnderecosService;
import com.ecoville.servicos.enderecos.EnderecosService;


@Service
public class UsuarioServiceImp implements UsuarioServices{

   @Autowired
    private EnderecosService enderecoService;

    @Autowired
    private UsuarioRepositorio repositorio;

    @Override
    public UsuarioResponseDto criar(UsuarioRequestDto dto){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }

        if(nomeUsuarioExiste(dto, null)){
            throw new BadRequestException("nome de usuario já existente");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        Endereco endereco = enderecoService.criar(dto.endereco());

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

        if(nomeUsuarioExiste(dto, id)){
            throw new BadRequestException("nome de usuario já registrado");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        usuario.setId(id);

        usuario.setEndereco(repositorio.findById(id).get().getEndereco());

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

private Boolean nomeUsuarioExiste(UsuarioRequestDto dto, Long id){

    List<UsuarioResponseDto> lista = todos();

    for(int i =0;i<lista.size();i++){
        if(dto.nomeUsuario().equals(lista.get(i).nomeUsuario()) && lista.get(i).id() != id){
            return true;
        }
    }

    return false;
}

}