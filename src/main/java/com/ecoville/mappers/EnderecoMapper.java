package com.ecoville.mappers;

import java.util.List;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.entities.Endereco;

public class EnderecoMapper {

    private EnderecoMapper(){};

    public static Endereco praEntidade(EnderecoRequestDto dto){
        Endereco endereco = new Endereco();

        endereco.setBairro(dto.bairro());
        endereco.setCep(dto.cep());
        endereco.setCidade(dto.cidade());
        endereco.setEstado(dto.estado());
        endereco.setLatitude(dto.latitude());
        endereco.setLongitude(dto.longitude());
        endereco.setNumero(dto.numero());

        return endereco;
    }

    public static EnderecoResponseDto praDto(Endereco endereco){
        return new EnderecoResponseDto(
            endereco.getId(),
            endereco.getCep(),
            endereco.getLogradouro(),
            endereco.getEstado(),
            endereco.getCidade(),
            endereco.getBairro(),
            endereco.getNumero(),
            endereco.getComplemento(),
            endereco.getLatitude(),
            endereco.getLongitude()
        );
    }

    public static List<EnderecoResponseDto> listaDto(List<Endereco>enderecos){
        return enderecos.stream()
        .map(EnderecoMapper::praDto)
        .toList();
    };
    

}
