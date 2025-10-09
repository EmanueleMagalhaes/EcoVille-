package com.ecoville.servicos.SolicitacoesColetas;

import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaRequest;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.entities.SolicitacaoColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.enums.Status;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.SolicitacaoColetaMapper;
import com.ecoville.repositories.SolicitacaoColetaRepository;
import com.ecoville.repositories.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitacaoColetaImpl implements SolicitacaoColetaService {

    @Override
    public SolicitacaoColetaResponse criar(SolicitacaoColetaRequest dto, Long usuarioId) {
        return null;
    }

    @Override
    public List<SolicitacaoColetaResponse> listarMinhas(Long usuarioId) {
        return List.of();
    }

    @Override
    public SolicitacaoColetaResponse editar(Long id, SolicitacaoColetaRequest dto, Long usuarioId) {
        return null;
    }

    @Override
    public List<SolicitacaoColetaResponse> listarDisponiveis() {
        return List.of();
    }

    @Override
    public SolicitacaoColetaResponse aceitar(Long id, Long coletorId) {
        return null;
    }

    @Override
    public SolicitacaoColetaResponse cancelar(Long id, Long usuarioId) {
        return null;
    }

    @Override
    public SolicitacaoColetaResponse finalizar(Long id) {
        return null;
    }

    @Override
    public SolicitacaoColetaResponse adicionarFeedback(Long id, String feedback) {
        return null;
    }
}
