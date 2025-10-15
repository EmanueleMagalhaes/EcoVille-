package com.ecoville.servicos.usuarios;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;

public interface UsuarioServices extends UserDetailsService{
    
    public UsuarioResponseDto criar(UsuarioRequestDto usuario);

    public UsuarioResponseDto porId(Long id);

    public List<UsuarioResponseDto> todos();

    public UsuarioResponseDto editar(UsuarioRequestDto usuario, Long id);

    public void excluir(Long id);

    public UserDetails loadUserByUsername(String nomeUsuario);

    public Optional<Usuario> porNomeUsuario(String nome);

}
