package com.ecoville.servicos.SolicitacoesColetas;

import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaRequest;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.entities.ItemColeta;
import com.ecoville.entities.SolicitacaoColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.enums.Status;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.ItemMapper;
import com.ecoville.mappers.SolicitacaoColetaMapper;
import com.ecoville.repositories.SolicitacaoColetaRepository;
import com.ecoville.repositories.UsuarioRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitacaoColetaImpl implements SolicitacaoColetaService {

    private final SolicitacaoColetaRepository solicitacaoRepositorio;
    private final UsuarioRepositorio usuarioRepositorio;

    @Override
    public SolicitacaoColetaResponse criar(SolicitacaoColetaRequest dto, Long usuarioId) {
        if (dto == null) throw new BadRequestException("Dados inválidos");

        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário residencial não encontrado"));

        if (usuario.getPerfil() != Perfil.RESIDENCIAL)
            throw new BadRequestException("Apenas usuário residencial podem criar solicitações");

        SolicitacaoColeta coleta = SolicitacaoColetaMapper.praEntidade(dto, usuario);
        coleta.setStatus(Status.AGUARDANDO);

        coleta = solicitacaoRepositorio.save(coleta);

        return SolicitacaoColetaMapper.praDto(coleta);
    }

    @Override
    public List<SolicitacaoColetaResponse> listarMinhas(Long usuarioId) {
        Usuario usuario = usuarioRepositorio.findById(usuarioId)
                .orElseThrow(() -> new NotFoundException("Usuário não encontrado"));
        List<SolicitacaoColeta> lista = solicitacaoRepositorio.findByUsuarioResidencial(usuario);
        return SolicitacaoColetaMapper.praListaDto(lista);
    }

    @Override
    public SolicitacaoColetaResponse editar(Long id, SolicitacaoColetaRequest dto, Long usuarioId) {
        SolicitacaoColeta existente = solicitacaoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitação não encontrada"));

        if (!existente.getUsuarioResidencial().getId().equals(usuarioId))
            throw new BadRequestException("Usuário não autorizado a editar esta solicitação");

        if (existente.getStatus() != Status.AGUARDANDO)
            throw new BadRequestException("Apenas solicitações com status AGUARDANDO podem ser editadas");

        existente.setDataAgendada(dto.getDataAgendada());
        existente.setObservacoes(dto.getObservacoes());

        if (dto.getItensColeta() != null) {
            existente.getItensColeta().clear();
            List<ItemColeta> novosItens = dto.getItensColeta().stream()
                    .map(itemDto -> {
                        ItemColeta item = ItemMapper.praEntidade(itemDto);
                        item.setSolicitacaoColeta(existente);
                        return item;
                    })
                    .toList();

            existente.getItensColeta().addAll(novosItens);
        }

        solicitacaoRepositorio.save(existente);
        return SolicitacaoColetaMapper.praDto(existente);
    }

    @Override
    public List<SolicitacaoColetaResponse> listarDisponiveis() {
        List<SolicitacaoColeta> lista = solicitacaoRepositorio.findByStatus(Status.AGUARDANDO);
        return SolicitacaoColetaMapper.praListaDto(lista);
    }

    @Override
    public SolicitacaoColetaResponse aceitar(Long id, Long coletorId) {
        SolicitacaoColeta coleta = solicitacaoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitação não encontrada"));

        Usuario coletor = usuarioRepositorio.findById(coletorId)
                .orElseThrow(() -> new NotFoundException("Coletor não encontrado"));

        if (coletor.getPerfil() != Perfil.COLETOR)
            throw new BadRequestException("Somente coletores podem aceitar solicitações");

        coleta.setColetor(coletor);
        coleta.setStatus(Status.ACEITA);
        solicitacaoRepositorio.save(coleta);

        return SolicitacaoColetaMapper.praDto(coleta);
    }

    @Override
    public SolicitacaoColetaResponse cancelar(Long id, Long usuarioId) {
        SolicitacaoColeta coleta = solicitacaoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitação não encontrada"));

        if (!coleta.getUsuarioResidencial().getId().equals(usuarioId))
            throw new BadRequestException("Usuário não autorizado a cancelar esta solicitação");

        if (coleta.getStatus() != Status.AGUARDANDO)
            throw new BadRequestException("Somente solicitações AGUARDANDO podem ser canceladas");

        coleta.setStatus(Status.CANCELADA);
        solicitacaoRepositorio.save(coleta);

        return SolicitacaoColetaMapper.praDto(coleta);
    }

    @Override
    public SolicitacaoColetaResponse finalizar(Long id) {
        SolicitacaoColeta coleta = solicitacaoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("Solicitação não encontrada"));

        if (coleta.getStatus() != Status.ACEITA && coleta.getStatus() != Status.COLETADA)
            throw new BadRequestException("Somente solicitações ACEITAS e COLETADAS podem ser finalizadas");

        coleta.setStatus(Status.FINALIZADA);
        solicitacaoRepositorio.save(coleta);

        return SolicitacaoColetaMapper.praDto(coleta);
    }

    @Override
    public SolicitacaoColetaResponse adicionarFeedback(Long id, String feedback) {
        SolicitacaoColeta coleta = solicitacaoRepositorio.findById(id)
                .orElseThrow(() -> new NotFoundException("solicitação não encontrada"));

        if (coleta.getStatus() != Status.FINALIZADA)
            throw new BadRequestException("Feedback só pode ser adicionado após a finalização");

        coleta.setFeedback(feedback);
        solicitacaoRepositorio.save(coleta);

        return SolicitacaoColetaMapper.praDto(coleta);
    }

    @Override
    public List<SolicitacaoColetaResponse> todos(){
        return SolicitacaoColetaMapper.praListaDto(solicitacaoRepositorio.findAll());
    }


    public SolicitacaoColeta salvarSolicitacao(SolicitacaoColeta coleta) {
        return solicitacaoRepositorio.save(coleta);
    }

}
