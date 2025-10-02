package com.ecoville.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.ecoville.dtos.itemColeta.ItemRequestDto;
import com.ecoville.dtos.itemColeta.ItemResponseDto;
import com.ecoville.entities.ItemColeta;

@Mapper(componentModel = "spring")
public interface ItemMapper {
    
    public ItemColeta praEntidade(ItemRequestDto item);

    public ItemResponseDto praDto(ItemColeta item);

    public List<ItemResponseDto> praLista(List<ItemColeta>lista);
}