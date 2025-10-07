package com.ecoville.dtos.itemColeta;

import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemRequestDto{
    private Tipo tipo;
    private double quantEstimada;
    private double quantReal;
    private Estado estado;
}