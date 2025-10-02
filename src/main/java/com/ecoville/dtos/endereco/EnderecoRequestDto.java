package com.ecoville.dtos.endereco;

public record EnderecoRequestDto (

    int cep,
    String logradouro,
    String estado,
    String cidade,
    String bairro,
    int numero,
    String complemento,
    double latitude,
    double longitude

){}