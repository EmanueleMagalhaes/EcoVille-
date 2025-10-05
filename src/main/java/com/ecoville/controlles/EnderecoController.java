package com.ecoville.controlles;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.dtos.endereco.EnderecoResponseDto;
import com.ecoville.entities.Endereco;
import com.ecoville.servicos.enderecos.EnderecosService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecosService servico;

    @PostMapping
    public Endereco criar(@RequestBody EnderecoRequestDto dto){

        return servico.criar(dto);
    }

    @GetMapping
    public List<EnderecoResponseDto> todos(){
        return servico.todos();
    }

    @GetMapping("{id}")
    public EnderecoResponseDto porId(@PathVariable Long id){
        return servico.porId(id);
    }

    @PutMapping("{id}")
    public EnderecoResponseDto editar(@RequestBody EnderecoRequestDto dto, @PathVariable Long id){
        return servico.editar(dto, id);
    }


    
}
