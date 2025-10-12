package com.ecoville.mappers;

import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaRequest;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.entities.ItemColeta;
import com.ecoville.entities.SolicitacaoColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Status;

import java.util.List;
import java.util.stream.Collectors;

public class SolicitacaoColetaMapper {

    private SolicitacaoColetaMapper(){}

    public static SolicitacaoColeta praEntidade(SolicitacaoColetaRequest dto, Usuario usuarioResidencial) {
        SolicitacaoColeta entidade = new SolicitacaoColeta();

        entidade.setDataAgendada(dto.getDataAgendada());
        entidade.setObservacoes(dto.getObservacoes());
        entidade.setStatus(Status.AGUARDANDO);
        entidade.setUsuarioResidencial(usuarioResidencial);

        List<ItemColeta> itens = dto.getItensColeta().stream()
                .map(itemDto -> {
                    ItemColeta item = ItemMapper.praEntidade(itemDto);
                    item.setSolicitacaoColeta(entidade); // garante vínculo bidirecional
                    return item;
                })
                .collect(Collectors.toList());

        entidade.setItensColeta(itens);

        return entidade;
    }

    public static SolicitacaoColetaResponse praDto(SolicitacaoColeta entidade) {
        return new SolicitacaoColetaResponse(
                entidade.getId(),
                entidade.getStatus(),
                entidade.getDataSolicitacao(),
                entidade.getDataAgendada(),
                entidade.getObservacoes(),
                entidade.getFeedback(),
                UsuarioMapper.praDtoColeta(entidade.getUsuarioResidencial()),
                entidade.getColetor() != null ? UsuarioMapper.praDtoColeta(entidade.getColetor()) : null,
                ItemMapper.praLista(entidade.getItensColeta())
        );
    }

    public static List<SolicitacaoColetaResponse> praListaDto(List<SolicitacaoColeta> lista) {
        return lista.stream()
                .map(SolicitacaoColetaMapper::praDto)
                .toList();
    }


    
}
