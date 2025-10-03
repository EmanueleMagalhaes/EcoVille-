package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.entities.ItemColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

public record SolicitacaoColetaResponse(
        Long id,
        Status status,
        LocalDateTime dataSolicitacao,
        LocalDateTime dataAgendada,
        String observacoes,
        String feedback,
        Usuario usuarioResidencial,
        Usuario coletor,
        List<ItemColeta> itensColeta
) {
}
