package com.ecoville.dtos.itemColeta;

import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;

public record ItemResponseDto (

    Long id,
    Tipo tipo,
    double quantEstimada,
    double quantReal,
    Estado estado
){}