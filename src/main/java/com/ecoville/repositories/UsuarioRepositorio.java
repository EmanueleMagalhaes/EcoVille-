package com.ecoville.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoville.entities.Usuario;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNomeUsuario(String username);
    
}
