package com.ecoville.dtos.itemColeta;

import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;

public record ItemRequestDto (

    Tipo tipo,
    double quantEstimada,
    double quantReal,
    Estado estado
){}