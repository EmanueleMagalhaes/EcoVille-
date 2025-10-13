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

    public List<SolicitacaoColetaResponse> atualizarLista(List<ItemRequestAtualiza>estados){

        List<ItemColeta> lista = new ArrayList<ItemColeta>();

        try{

        for(int i=0;i<estados.size();i++){
            ItemColeta item = porId(estados.get(i).getId());

            item.setEstado(ItemMapper.traduzEstado(estados.get(i).getEstado()));
            item.setQuantEstimada(estados.get(i).getQuantEstimada());
            item.setQuantReal(estados.get(i).getQuantReal());
            item.setTipo(ItemMapper.traduzTipo(estados.get(i).getTipo()));

            item = repositorio.save(item);

            lista.add(item);
        }}catch(NullPointerException e){
            throw new InternalServerErrorException("não foi possivel avaliar os itens" + e);
        }

        return servicoSolicitacao.listarDisponiveis();
    }

    
}