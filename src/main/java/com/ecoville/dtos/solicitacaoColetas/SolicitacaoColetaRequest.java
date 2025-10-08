package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.dtos.itemColeta.ItemRequestDto;
import com.ecoville.entities.ItemColeta;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SolicitacaoColetaRequest{
    private Long id;
    private LocalDate dataAgendada;
    private String observacoes;
    private List<ItemRequestDto> itensColeta;
}
