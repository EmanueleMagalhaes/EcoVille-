package com.ecoville.configs.usuariosPadrao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder encoder;

    private static final String DEFAULT_PASS = "administrador";

    

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {

        gerar();

        
    }

    private void gerar(){

        List<String> pessoas = nomes();

        for(int i=0;i<pessoas.size();i++){

            String nome = pessoas.get(i).toLowerCase().trim();

            boolean exists = usuarioRepositorio.findByNomeUsuario(nome).isPresent();

            if (!exists) {

                Usuario root = new Usuario();
                root.setNomeUsuario(nome);
                root.setSenha(encoder.encode(DEFAULT_PASS));
                root.setPerfil(Perfil.COLETOR);
                try {
                    usuarioRepositorio.save(root);
                    System.out.println("Usuário padrão '" + nome + "' criado com senha padrão.");
                } catch (Exception e) {
                    System.err.println("Falha ao criar usuário padrão '" + nome + "': " + e.getMessage());
                }

            } else {
                System.out.println("Usuário padrão '" + nome + "' já existe.");
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
