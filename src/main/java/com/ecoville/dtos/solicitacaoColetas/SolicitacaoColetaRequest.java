package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.entities.ItemColeta;

import java.time.LocalDate;
import java.util.List;

public record SolicitacaoColetaRequest(
        LocalDate dataAgendada,
        String observacoes,
        List<ItemColeta> itensColeta
) {
}
