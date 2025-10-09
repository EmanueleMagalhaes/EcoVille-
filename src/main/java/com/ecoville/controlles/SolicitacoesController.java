package com.ecoville.controlles;

import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaRequest;
import com.ecoville.dtos.solicitacaoColetas.SolicitacaoColetaResponse;
import com.ecoville.servicos.SolicitacoesColetas.SolicitacaoColetaImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/coletas")
public class SolicitacoesController {

    private final SolicitacaoColetaImpl service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SolicitacaoColetaResponse criar(@RequestParam Long usuarioId,@RequestBody @Valid SolicitacaoColetaRequest dto) {
        return service.criar(dto, usuarioId);
    }

    @GetMapping("/minhas")
    public List<SolicitacaoColetaResponse> listarMinhas(@RequestParam Long usuarioId) {
        return service.listarMinhas(usuarioId);
    }

    @PutMapping("/minhas")
    @ResponseStatus(HttpStatus.OK)
    public SolicitacaoColetaResponse editar(@RequestParam Long usuarioId,@RequestBody @Valid SolicitacaoColetaRequest dto) {
        return service.editar(dto.getId(), dto, usuarioId);
    }

    @GetMapping("/disponiveis")
    public List<SolicitacaoColetaResponse> listarDisponiveis() {

        return service.listarDisponiveis();
    }

    @PatchMapping("/{id}/aceitar")
    @ResponseStatus(HttpStatus.OK)
    public SolicitacaoColetaResponse aceitar(@PathVariable Long id,@RequestParam Long coletorId) {
        return service.aceitar(id, coletorId);
    }

    @PatchMapping("/{id}/cancelar")
    @ResponseStatus(HttpStatus.OK)
    public SolicitacaoColetaResponse cancelar(@PathVariable Long id,@RequestParam Long usuarioId) {
        return service.cancelar(id, usuarioId);
    }

    @PatchMapping("/{id}/finalizar")
    @ResponseStatus(HttpStatus.OK)
    public SolicitacaoColetaResponse finalizar(@PathVariable Long id) {

        return service.finalizar(id);
    }

    @PatchMapping("/{id}/feedback")
    @ResponseStatus(HttpStatus.OK)
    public SolicitacaoColetaResponse feedback(@PathVariable Long id,@RequestBody String feedback) {
        return service.adicionarFeedback(id, feedback);
    }
}
