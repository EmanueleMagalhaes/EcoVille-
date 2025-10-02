package com.ecoville.dtos.endereco;

public record EnderecoResponseDto (

    Long id,
    int cep,
    String logradouro,
    String estado,
    String cidade,
    String bairro,
    int numero,
    String complemento,
    float latitude,
    float longitude

){}