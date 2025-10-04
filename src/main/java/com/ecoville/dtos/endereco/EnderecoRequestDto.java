package com.ecoville.dtos.endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record EnderecoRequestDto (

    @NotNull(message = "cep vazio")
    String cep,
    
    @NotNull(message = "logradouro vazio")
    String logradouro,

    @NotBlank(message = "estado vazio")
    String estado,

    @NotBlank(message = "cidade vazio")
    String cidade,

    @NotBlank(message = "bairro vazio")
    String bairro,

    @NotNull(message = "numero vazio")
    String numero,

    @NotBlank(message = "complemento vazio")
    String complemento,

    @NotNull(message = "latitude vazio")
    BigDecimal latitude,

    @NotNull(message = "longitude vazio")
    BigDecimal longitude

){}