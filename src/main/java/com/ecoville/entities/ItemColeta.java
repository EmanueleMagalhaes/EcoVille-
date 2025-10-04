package com.ecoville.entities;

import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.Setter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Getter
@Setter


@NoArgsConstructor
@AllArgsConstructor


@Entity
@Table(name = "item_coleta")
public class ItemColeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @Enumerated
    private Tipo tipo;

    @Column
    private double quantEstimada;

    @Column(nullable = false)
    private double quantReal;

    @Column(nullable = false)
    @Enumerated
    private Estado estado;

    @ManyToOne
    @JoinColumn(name = "solicitacao_coleta_id", nullable = false)
    private SolicitacaoColeta solicitacaoColeta;
}