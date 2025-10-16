package com.ecoville.servicos.enderecos;

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

        try {
            endereco = repositorio.save(endereco);
        } catch (Exception e) {
            throw new BadRequestException("problema no endereço");
        }

        return endereco;
    }


    @Override
    public EnderecoResponseDto porId(Long id){

        if(repositorio.existsById(id)){
            return EnderecoMapper.praDto(repositorio.findById(id).get());
        }

        throw new NotFoundException("endereço id " + id + " não encontrado");
    }

    
}