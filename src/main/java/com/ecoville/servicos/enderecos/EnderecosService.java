package com.ecoville.servicos.enderecos;

import java.util.List;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;

public interface EnderecosService {
    
    public EnderecoResponseDto criar(EnderecoRequestDto endereco);

    public EnderecoResponseDto porId(Long id);

    public List<EnderecoResponseDto> todos();

    public EnderecoResponseDto editar(EnderecoRequestDto endereco, Long id);

    public void excluir(Long id);
}
