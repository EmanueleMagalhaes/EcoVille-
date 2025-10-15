package com.ecoville.servicos.login;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.login.LoginRequestDto;
import com.ecoville.dtos.login.LoginResponseDto;
import com.ecoville.entities.Usuario;
import com.ecoville.exceptions.ImATeapotException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.exceptions.UnauthorizedException;
import com.ecoville.mappers.UsuarioMapper;
import com.ecoville.servicos.usuarios.UsuarioServices;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final PasswordEncoder encoder;
    private final UsuarioServices usuarioServices;

    @Override
    public LoginResponseDto authenticate(LoginRequestDto dto) {

        if(dto.getNomeUsuario().equals("café")){
            throw new ImATeapotException("eu sou um bule de café por acaso?");
        }

        Usuario usuario = usuarioServices.porNomeUsuario(dto.getNomeUsuario())
        .orElseThrow(() -> new NotFoundException("usuario não encontrado"));


        if (!encoder.matches(dto.getSenha(), usuario.getPassword())) {
            throw new UnauthorizedException("senha negada");
        }

        String token = dto.getNomeUsuario() + ":" + dto.getSenha();
        token = Base64.getEncoder().encodeToString(token.getBytes());

        return LoginResponseDto.builder().type("Basic").token(token).usuario(UsuarioMapper.praDto(usuario)).build();
    }

}
