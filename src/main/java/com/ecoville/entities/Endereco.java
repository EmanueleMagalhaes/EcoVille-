package com.ecoville.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "enderecos")
public class Endereco {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 8, nullable = false)
    private int cep;

    @Column(nullable = false)
    private String logradouro;

    @Column(length = 2, nullable = false)
    private String estado;

    @Column(nullable = false, length = 100)
    private String cidade; 

    @Column(length  = 100, nullable = false)
    private String bairro;

    @Column(nullable = false, length = 10)
    private int numero;

    @Column(length = 100)
    private String complemento;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @OneToOne(mappedBy = "endereco")
    private Usuario usuario;
}
