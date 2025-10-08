package com.ecoville.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoville.entities.Endereco;

@Repository
public interface EnderecoRepositorio extends JpaRepository <Endereco, Long>{
    
}
