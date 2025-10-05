package com.ecoville.dtos.endereco;

import java.math.BigDecimal;

public record EnderecoResponseDto (

    Long id,
    String cep,
    String logradouro,
    String estado,
    String cidade,
    String bairro,
    String numero,
    String complemento,
    BigDecimal latitude,
    BigDecimal longitude

){}