package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.dtos.itemColeta.ItemResponseDto;

import com.ecoville.dtos.usuario.UsuarioResponseSimples;
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
        UsuarioResponseSimples usuarioResidencial,
        UsuarioResponseSimples coletor,
        List<ItemResponseDto> itensColeta
) {
}