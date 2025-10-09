package com.ecoville.dtos.usuario;

import java.util.List;

import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.enums.Perfil;

public record UsuarioResponseDto (
    Long id,
    String nomeUsuario,
    Perfil perfil,
    EnderecoResponseDto endereco,
    List<SolicitacaoColetaResponse> solicitacoes
){}