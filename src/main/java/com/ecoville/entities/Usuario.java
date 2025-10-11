package com.ecoville.entities;


import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecoville.enums.Perfil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "usuarios")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_usuario", length = 150, unique = true)
    private String nomeUsuario;

    @Column(nullable =  false)
    private String senha;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Perfil perfil;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "endereco_id", referencedColumnName = "id")
    private Endereco endereco;

    @OneToMany(mappedBy = "usuarioResidencial", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SolicitacaoColeta> solicitacoes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

       return List.of(() -> perfil.toString());
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isEnabled();
    }

    @Override
    public boolean isAccountNonLocked() {
        return isEnabled();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isEnabled();
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.nomeUsuario;
    }



}