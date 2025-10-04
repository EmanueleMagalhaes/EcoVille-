package com.ecoville.mappers;

import java.util.List;

import com.ecoville.dtos.itemColeta.ItemRequestDto;
import com.ecoville.dtos.itemColeta.ItemResponseDto;
import com.ecoville.entities.ItemColeta;

public class ItemMapper {

    private ItemMapper(){};
    
    public static ItemColeta praEntidade(ItemRequestDto dto){
        ItemColeta item = new ItemColeta();

        item.setEstado(dto.estado());
        item.setQuantEstimada(dto.quantEstimada());
        item.setQuantReal(dto.quantReal());
        item.setTipo(dto.tipo());

        return item;
    };

    public static ItemResponseDto praDto(ItemColeta item){
        return new ItemResponseDto();
    };

    public static List<ItemResponseDto> praLista(List<ItemColeta>lista){
        return lista.stream()
        .map(ItemMapper::praDto)
        .toList();
    };
}