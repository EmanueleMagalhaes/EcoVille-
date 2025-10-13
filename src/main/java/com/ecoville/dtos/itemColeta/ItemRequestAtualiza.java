
package com.ecoville.dtos.itemColeta;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemRequestAtualiza{
    private Long id;
    private String tipo;
    private double quantEstimada;
    private double quantReal;
    private String estado;
}