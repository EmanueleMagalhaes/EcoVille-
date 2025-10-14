package com.ecoville.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.ecoville.enums.Perfil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(Customizer.withDefaults())
                .formLogin(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/login").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/usuarios").permitAll()

                        .requestMatchers("/api/usuarios/*").hasAnyAuthority(Perfil.COLETOR.name(), Perfil.RESIDENCIAL.name())

                        .requestMatchers(HttpMethod.GET, "/api/usuarios/*").hasAnyAuthority(Perfil.COLETOR.name(), Perfil.RESIDENCIAL.name())

                        .requestMatchers(HttpMethod.GET, "/api/usuarios").hasAnyAuthority(Perfil.COLETOR.name())

                        .requestMatchers(HttpMethod.PUT, "/api/usuarios/*").hasAnyAuthority(Perfil.COLETOR.name(), Perfil.RESIDENCIAL.name())

                        .requestMatchers(HttpMethod.DELETE, "/api/usuarios/*").hasAnyAuthority(Perfil.COLETOR.name(), Perfil.RESIDENCIAL.name())





                        /* COLETAS */

                        // Aceitar solicitação: apenas coletor
                        .requestMatchers(HttpMethod.PATCH, "/api/coletas/*/aceitar").hasAuthority(Perfil.COLETOR.name())

                        // Criar solicitação: apenas usuário residencial
                        .requestMatchers(HttpMethod.POST, "/api/coletas").hasAuthority(Perfil.RESIDENCIAL.name())

                        // Operações nas próprias solicitações do usuário residencial
                        .requestMatchers(HttpMethod.GET, "/api/coletas/minhas/**").hasAuthority(Perfil.RESIDENCIAL.name())
                        .requestMatchers(HttpMethod.PUT, "/api/coletas/minhas/**").hasAuthority(Perfil.RESIDENCIAL.name())

                        // Listar solicitações disponíveis: apenas coletor
                        .requestMatchers(HttpMethod.GET, "/api/coletas/disponiveis").hasAuthority(Perfil.COLETOR.name())

                        // Cancelar solicitação: somente usuário residencial (criador)
                        .requestMatchers(HttpMethod.PATCH, "/api/coletas/*/cancelar").hasAuthority(Perfil.RESIDENCIAL.name())

                        // Finalizar: apenas coletor
                        .requestMatchers(HttpMethod.PATCH, "/api/coletas/*/finalizar").hasAuthority(Perfil.COLETOR.name())

                        // Feedback: tipicamente o usuário residencial deixa feedback após finalização
                        .requestMatchers(HttpMethod.PATCH, "/api/coletas/*/feedback").hasAuthority(Perfil.COLETOR.name())

                        .requestMatchers(HttpMethod.PATCH, "/api/coletas/avaliar").hasAuthority(Perfil.COLETOR.name())

                        .anyRequest().authenticated()
                        
                );
        return http.build();
    }

}