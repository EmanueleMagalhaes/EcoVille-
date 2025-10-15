package com.ecoville.controlles;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.servicos.usuarios.UsuarioServices;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/usuarios")
public class UsuarioController {

    private final UsuarioServices servico;

    @GetMapping
    public List<UsuarioResponseDto> lista(){
        return servico.todos();
    }

    @GetMapping("{id}")
    public UsuarioResponseDto porId(@PathVariable Long id){
        return servico.porId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDto criar(@RequestBody @Valid UsuarioRequestDto usuario){

        System.out.println("Recebi DTO: " + usuario);
        return servico.criar(usuario);
    }

    @PutMapping("{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioResponseDto editar(@RequestBody UsuarioRequestDto usuario, @PathVariable Long id){
        return servico.editar(usuario, id);
    }

    @DeleteMapping("{id}")
    public void excluir(@PathVariable Long id){
        servico.excluir(id);
    }

    
}
