package com.ecoville.servicos.SolicitacoesColetas;

import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaRequest;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;

import java.util.List;

public interface SolicitacaoColetaService {

    SolicitacaoColetaResponse criar(SolicitacaoColetaRequest dto, Long usuarioId);

    List<SolicitacaoColetaResponse> listarMinhas(Long usuarioId);

    SolicitacaoColetaResponse editar(Long id, SolicitacaoColetaRequest dto, Long usuarioId);

    SolicitacaoColetaResponse aceitar(Long id, Long coletorId);

    SolicitacaoColetaResponse cancelar(Long id, Long usuarioId);

    SolicitacaoColetaResponse finalizar(Long id);

    SolicitacaoColetaResponse adicionarFeedback(Long id, String feedback);

    List<SolicitacaoColetaResponse> todos();

}