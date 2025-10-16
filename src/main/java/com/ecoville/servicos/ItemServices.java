package com.ecoville.servicos;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.itemColeta.ItemRequestAtualiza;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.entities.ItemColeta;
import com.ecoville.exceptions.InternalServerErrorException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.ItemMapper;
import com.ecoville.repositories.ItemColetaRepository;
import com.ecoville.servicos.SolicitacoesColetas.SolicitacaoColetaImpl;

@Service
public class ItemServices {

    @Autowired
    public ItemColetaRepository repositorio;
    @Autowired
    public SolicitacaoColetaImpl servicoSolicitacao;

    public ItemColeta porId(Long id){
        return repositorio.findById(id).orElseThrow(
            () -> new NotFoundException("Item não encontrado"));
    }

    public List<SolicitacaoColetaResponse> atualizarLista(List<ItemRequestAtualiza> estados) {
        List<ItemColeta> lista = new ArrayList<>();

        try {
            for (ItemRequestAtualiza dto : estados) {
                ItemColeta item = porId(dto.getId());
                item.setEstado(ItemMapper.traduzEstado(dto.getEstado()));
                item.setQuantEstimada(dto.getQuantEstimada());
                item.setQuantReal(dto.getQuantReal());
                item.setTipo(ItemMapper.traduzTipo(dto.getTipo()));
                item = repositorio.save(item);
                lista.add(item);
            }

            // 🟢 Atualiza o status da solicitação vinculada
            if (!lista.isEmpty()) {
                var solicitacao = lista.get(0).getSolicitacaoColeta();
                solicitacao.setStatus(com.ecoville.enums.Status.COLETADA);
                servicoSolicitacao.salvarSolicitacao(solicitacao);
            }

        } catch (Exception e) {
            throw new InternalServerErrorException("Erro ao avaliar os itens: " + e.getMessage());
        }

        return servicoSolicitacao.todos(); // ou listarMinhas(usuarioId) se preferir
    }



}