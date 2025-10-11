package com.ecoville.configs.usuariosPadrao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.repositories.UsuarioRepositorio;

import jakarta.transaction.Transactional;

@Component
public class StartupDataLoader implements ApplicationRunner {

    private final UsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;

    private static final String DEFAULT_PASS = "administrador";

    public StartupDataLoader(UsuarioRepositorio usuarioRepositorio, PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {

        gerar();

        
    }

    private void gerar(){

        List<String> pessoas = nomes();

        for(int i=0;i<pessoas.size();i++){

            boolean exists = usuarioRepositorio.findByNomeUsuario(pessoas.get(i)).isPresent();

        if (!exists) {

            Usuario root = new Usuario();
            root.setNomeUsuario(pessoas.get(i));
            root.setSenha(passwordEncoder.encode(DEFAULT_PASS));
            root.setPerfil(Perfil.COLETOR);
            usuarioRepositorio.save(root);

            System.out.println("Usuário padrão " +pessoas.get(i)+ " criado.");

        } else {
            System.out.println("Usuário padrão " +pessoas.get(i)+ " já existe.");
        }
        }
    }


    private List<String> nomes(){

        ArrayList<String> nomes = new ArrayList<String>();

        nomes.add("Lorena");
        nomes.add("Mike");
        nomes.add("Damiao");
        nomes.add("Samantha");


        return nomes;
    }
}
