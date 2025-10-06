package com.ecoville.dtos.usuario;

import com.ecoville.dtos.endereco.EnderecoRequestDto;
import com.ecoville.enums.Perfil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioRequestDto {

    @NotBlank(message = "O nome de usuário é obrigatório.")
    private String nomeUsuario;

    @NotBlank(message = "A senha é obrigatória.")
    private String senha;

    @NotNull(message = "O perfil é obrigatório.")
    private Perfil perfil;

    @NotNull(message = "O endereço é obrigatório.")
    @Valid
    private EnderecoRequestDto endereco;
}