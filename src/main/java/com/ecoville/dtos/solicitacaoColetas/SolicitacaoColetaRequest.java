package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.dtos.itemColeta.ItemRequestDto;

import java.time.LocalDate;
import java.util.List;

public record SolicitacaoColetaRequest(
        LocalDate dataAgendada,
        String observacoes,
        List<ItemRequestDto> itensColeta
) {
}
