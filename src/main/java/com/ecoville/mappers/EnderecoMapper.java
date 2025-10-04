package com.ecoville.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.entities.Endereco;

@Mapper(componentModel = "spring")
public interface EnderecoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    public Endereco praEntidade(EnderecoRequestDto endereco);

    public EnderecoResponseDto praDto(Endereco endereco);

    public List<EnderecoResponseDto> listaDto(List<Endereco>endereco);
    
}

