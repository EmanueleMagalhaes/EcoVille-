package com.ecoville.dtos.solicitacaoColetas;

import com.ecoville.dtos.itemColeta.ItemRequestDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SolicitacaoColetaRequest{
    private LocalDate dataAgendada;
    private String observacoes;
    private List<ItemRequestDto> itensColeta;
}
