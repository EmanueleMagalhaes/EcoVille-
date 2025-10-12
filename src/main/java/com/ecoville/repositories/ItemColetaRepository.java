package com.ecoville.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecoville.entities.ItemColeta;

@Repository
public interface ItemColetaRepository extends JpaRepository<ItemColeta, Long>{
    
}
