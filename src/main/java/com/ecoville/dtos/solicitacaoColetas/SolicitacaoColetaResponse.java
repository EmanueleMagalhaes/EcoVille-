package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.dtos.itemColeta.ItemResponseDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;

import com.ecoville.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoColetaResponse(
        Long id,
        Status status,
        LocalDateTime dataSolicitacao,
        LocalDate dataAgendada,
        String observacoes,
        String feedback,
        UsuarioResponseDto usuarioResidencial,
        UsuarioResponseDto coletor,
        List<ItemResponseDto> itensColeta
) {
}