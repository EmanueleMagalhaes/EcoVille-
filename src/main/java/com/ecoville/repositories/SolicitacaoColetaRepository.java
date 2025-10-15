package com.ecoville.repositories;

import com.ecoville.entities.SolicitacaoColeta;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoColetaRepository extends JpaRepository<SolicitacaoColeta,Long> {
    List<SolicitacaoColeta> findByUsuarioResidencial(Usuario usuario);

    List<SolicitacaoColeta> findByStatus(Status status);
}
