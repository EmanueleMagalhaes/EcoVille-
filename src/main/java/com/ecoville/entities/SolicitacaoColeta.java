package com.ecoville.entities;

import com.ecoville.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "solicitacoes_coleta")
public class SolicitacaoColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private LocalDateTime dataSolicitacao = LocalDateTime.now();

    @Column
    private LocalDate dataAgendada;

    @Column(length = 500)
    private String observacoes;

    @Column(length = 500)
    private String feedback;

    @ManyToOne
    @JoinColumn(name = "usuario_residencial_id", nullable = false)
    private Usuario usuarioResidencial;

    @ManyToOne
    @JoinColumn(name = "coletor_id")
    private Usuario coletor;

    @OneToMany(mappedBy = "solicitacaoColeta", cascade = CascadeType.ALL)
    private List<ItemColeta> itensColeta;
}
