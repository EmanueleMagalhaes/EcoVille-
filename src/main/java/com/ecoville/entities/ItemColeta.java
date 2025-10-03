package com.ecoville.entities;

import com.ecoville.enums.Estado;
import com.ecoville.enums.Tipo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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

    /*@ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;*/

    @ManyToOne
    @JoinColumn(name = "solicitacao_coleta_id", nullable = false)
    private SolicitacaoColeta solicitacaoColeta;
}