package com.ecoville.dtos.endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EnderecoRequestDto (

    @NotNull(message = "cep vazio")
    Integer cep,
    
    @NotNull(message = "logradouro vazio")
    String logradouro,

    @NotBlank(message = "estado vazio")
    String estado,

    @NotBlank(message = "cidade vazio")
    String cidade,

    @NotBlank(message = "bairro vazio")
    String bairro,

    @NotNull(message = "numero vazio")
    Integer numero,

    @NotBlank(message = "complemento vazio")
    String complemento,

    @NotNull(message = "latitude vazio")
    Double latitude,

    @NotNull(message = "longitude vazio")
    Double longitude

){}