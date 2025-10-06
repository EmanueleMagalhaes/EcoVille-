package com.ecoville.dtos.endereco;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class EnderecoRequestDto {
    @NotNull(message = "cep vazio")
    private String cep;

    @NotNull(message = "logradouro vazio")
    private String logradouro;

    @NotBlank(message = "estado vazio")
    private String estado;

    @NotBlank(message = "cidade vazio")
    private String cidade;

    @NotBlank(message = "bairro vazio")
    private String bairro;

    @NotNull(message = "numero vazio")
    private String numero;

    private String complemento;

    @NotNull(message = "latitude vazio")
    private BigDecimal latitude;

    @NotNull(message = "longitude vazio")
    private BigDecimal longitude;
}