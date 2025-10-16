package com.ecoville.servicos.enderecos;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.entities.Endereco;

public interface EnderecosService {
    
    public Endereco criar(EnderecoRequestDto endereco);

    public EnderecoResponseDto porId(Long id);
}
