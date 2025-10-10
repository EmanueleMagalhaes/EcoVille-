package com.ecoville.servicos.usuarios;

import java.util.List;

import com.ecoville.entities.Endereco;
import com.ecoville.mappers.EnderecoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecoville.dtos.usuario.UsuarioRequestDto;
import com.ecoville.dtos.usuario.UsuarioResponseDto;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.exceptions.BadRequestException;
import com.ecoville.exceptions.NotFoundException;
import com.ecoville.mappers.UsuarioMapper;
import com.ecoville.repositories.UsuarioRepositorio;


@Service
public class UsuarioServiceImp implements UsuarioServices{

    @Autowired
    private UsuarioRepositorio repositorio;

    @Autowired
    private PasswordEncoder encoder;

    private static final String DEFAULT_USER = "root";
    private static final String DEFAULT_PASS = "admin";

    @Override
    public UsuarioResponseDto criar(UsuarioRequestDto dto){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        Endereco endereco = EnderecoMapper.praEntidade(dto.getEndereco());

        usuario.setSenha(encoder.encode(dto.getSenha()));

        usuario.setEndereco(endereco);

        usuario = repositorio.save(usuario);

        return UsuarioMapper.praDto(usuario);

    }

    @Override
    public UsuarioResponseDto porId(Long id){

        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado"); }

        return UsuarioMapper.praDto(repositorio.findById(id).get());

    }

    @Override
    public List<UsuarioResponseDto> todos(){

        return UsuarioMapper.listaDtos(repositorio.findAll());
    }

    @Override
    public UsuarioResponseDto editar(UsuarioRequestDto dto, Long id){

        if(dto == null){
            throw new BadRequestException("Usuario nulo não permitido");
        }
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        }

        Usuario usuario = UsuarioMapper.praEntidade(dto);

        Usuario antigo = repositorio.findById(id).get();

        usuario.setId(id);

        usuario.setEndereco(antigo.getEndereco());

        usuario.setSolicitacoes(antigo.getSolicitacoes());

        usuario = repositorio.save(usuario);

        return UsuarioMapper.praDto(usuario);
    }

    @Override
    public void excluir(Long id){
        if(!repositorio.existsById(id)){
            throw new NotFoundException("usuario id " + id + " não encontrado");
        };

        repositorio.deleteById(id);
    }

    /* 
    @Override
    public UserDetails loadUserByUsername(String nomeUsuario) throws UsernameNotFoundException {
        Optional<Usuario> usuario = repositorio.findByNomeUsuario(nomeUsuario).orElseThrow();
        if (usuario.isPresent()) {
            return usuario.get();
        }

        if (nomeUsuario.equals(DEFAULT_USER)) {

            Usuario novo = usuario.get().orE;

            Perfil perfil = Perfil.valueOf("COLETOR");

            novo.setId(0L);
            novo.setNomeUsuario(DEFAULT_USER);
            novo.setSenha(encoder.encode(DEFAULT_PASS));
            novo.setPerfil(perfil);
            return Usuario.builder()
                    .id(0L)
                    .name("ROOT")
                    .username(DEFAULT_USER)
                    .password(encoder.encode(DEFAULT_PASS))
                    .role("ADMIN")
                    .build();
        }

        throw new UsernameNotFoundException(nomeUsuario);
    }*/

    @Override
public UserDetails loadUserByUsername(String nomeUsuario) throws UsernameNotFoundException {
    return repositorio.findByNomeUsuario(nomeUsuario)
        .orElseGet(() -> {
            if (nomeUsuario.equals(DEFAULT_USER)) {
                Usuario root = new Usuario();
                root.setId(0L);
                root.setNomeUsuario(DEFAULT_USER);
                root.setSenha(encoder.encode(DEFAULT_PASS));
                root.setPerfil(Perfil.COLETOR);
                return root;
            }
            throw new UsernameNotFoundException(nomeUsuario);
        });
}
}