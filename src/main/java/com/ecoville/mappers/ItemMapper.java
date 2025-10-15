package com.ecoville.mappers;

import java.util.List;

import com.ecoville.dtos.itemColeta.ItemRequestDto;
import com.ecoville.dtos.itemColeta.ItemResponseDto;
import com.ecoville.entities.ItemColeta;
import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;
import com.ecoville.exceptions.BadRequestException;

public class ItemMapper {

    private ItemMapper(){};
    
    public static ItemColeta praEntidade(ItemRequestDto dto){
        ItemColeta item = new ItemColeta();

        item.setEstado(traduzEstado(dto.getEstado()));
        item.setQuantEstimada(dto.getQuantEstimada());
        item.setQuantReal(dto.getQuantReal());
        item.setTipo(traduzTipo(dto.getTipo()));

        return item;
    };

    public static ItemResponseDto praDto(ItemColeta item){
        return new ItemResponseDto(
            item.getId(),
            item.getTipo(),
            item.getQuantEstimada(),
            item.getQuantReal(),
            item.getEstado()
        );
    };

    public static List<ItemResponseDto> praLista(List<ItemColeta>lista){
        return lista.stream()
        .map(ItemMapper::praDto)
        .toList();
    };




    public static Tipo traduzTipo(String dto){

        Tipo tipo = null;

        try {
            tipo = Tipo.valueOf(dto.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new BadRequestException("valor de tipo incorreto" + e);
        }

        return tipo;
    }

    public static Estado traduzEstado(String dto){

        Estado estado = null;

        try {
            estado = Estado.valueOf(dto.toUpperCase());
        } catch (IllegalArgumentException | NullPointerException e) {
            throw new BadRequestException("valor de estado incorreto" + e);
        }

        return estado;
    }

}