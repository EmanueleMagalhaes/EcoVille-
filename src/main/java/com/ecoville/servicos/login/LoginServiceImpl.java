package com.ecoville.servicos.login;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.login.LoginRequestDto;
import com.ecoville.dtos.login.LoginResponseDto;
import com.ecoville.servicos.usuarios.UsuarioServices;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final PasswordEncoder encoder;
    private final UsuarioServices usuarioServices;

    @Override
    public LoginResponseDto authenticate(LoginRequestDto dto) {
        UserDetails usuario = usuarioServices.loadUserByUsername(dto.getUsername());
        if (!encoder.matches(dto.getPassword(), usuario.getPassword())) {
            throw new UsernameNotFoundException(usuario.getUsername());
        }

        String token = dto.getUsername() + ":" + dto.getPassword();
        token = Base64.getEncoder().encodeToString(token.getBytes());

        return LoginResponseDto.builder().type("Basic").token(token).build();
    }

}
