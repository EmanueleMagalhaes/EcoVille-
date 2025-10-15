package com.ecoville.dtos.itemColeta;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemRequestDto{
    private String tipo;
    private double quantEstimada;
    private double quantReal;
    private String estado;
}