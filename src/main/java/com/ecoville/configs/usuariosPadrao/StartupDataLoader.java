package com.ecoville.configs.usuariosPadrao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.entities.Endereco;
import com.ecoville.entities.Usuario;
import com.ecoville.enums.Perfil;
import com.ecoville.repositories.UsuarioRepositorio;
import com.ecoville.servicos.enderecos.EnderecosService;

import jakarta.transaction.Transactional;

@Component
public class StartupDataLoader implements ApplicationRunner {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private EnderecosService enderecoService;

    private static final String DEFAULT_PASS = "administrador";

    

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {

        gerar();

        
    }

    private void gerar(){

        List<String> pessoas = nomes();

        for(int i=0;i<pessoas.size();i++){

            String nome = pessoas.get(i).trim();

            boolean exists = usuarioRepositorio.findByNomeUsuario(nome).isPresent();

            if (!exists) {

                Usuario root = new Usuario();
                root.setNomeUsuario(nome);
                root.setSenha(encoder.encode(DEFAULT_PASS));
                root.setPerfil(Perfil.COLETOR);
                root.setEndereco(endereco());

                try {

                    root = usuarioRepositorio.save(root);



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


    private Endereco endereco(){

        EnderecoRequestDto lugar = new EnderecoRequestDto();

        lugar.setCep("89204440");
        lugar.setLogradouro("Rua Blumenau");
        lugar.setEstado("SC");
        lugar.setCidade("Joinville");
        lugar.setBairro("América");
        lugar.setNumero("123");
        lugar.setComplemento("Apartamento 202");
        lugar.setLatitude(new BigDecimal("-26.304408"));
        lugar.setLongitude(new BigDecimal("-48.846383"));
        

        Endereco endereco = enderecoService.criar(lugar);

        return endereco;
    }
}