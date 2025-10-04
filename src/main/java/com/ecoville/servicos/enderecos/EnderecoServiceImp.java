package com.ecoville.servicos.enderecos;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.entities.Endereco;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.EnderecoMapper;
import com.ecoville.repositories.EnderecoRepositorio;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class EnderecoServiceImp implements EnderecosService{

    private final EnderecoRepositorio repositorio;

    @Override
    public Endereco criar(EnderecoRequestDto dto) {

        if(dto == null){
            throw new BadRequestException("endereço vazio não é permitido");
        }

        Endereco endereco = EnderecoMapper.praEntidade(dto);
        endereco = repositorio.save(endereco);

        return endereco;
    }

    @Override
    public List<EnderecoResponseDto> todos(){

        return EnderecoMapper.listaDto(repositorio.findAll());
    };

    @Override
    public EnderecoResponseDto porId(Long id){

        if(repositorio.existsById(id)){
            return EnderecoMapper.praDto(repositorio.findById(id).get());
        }

        throw new NotFoundException("endereço id " + id + " não encontrado");
    }


    @Override
    public EnderecoResponseDto editar(EnderecoRequestDto dto, Long id){
        if(dto == null){
            throw new BadRequestException("endereço vazio não é permitido");
        }

        Endereco endereco = EnderecoMapper.praEntidade(dto);
        endereco.setId(id);

        endereco = repositorio.save(endereco);

        return EnderecoMapper.praDto(endereco);
        
    }


    @Override
    public void excluir(Long id){
        if(repositorio.existsById(id)){
            repositorio.deleteById(id);
        }else{
            throw new NotFoundException("endereço id " + id + " não encontrado");
        }
    }
    
}