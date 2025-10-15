package com.ecoville.controlles;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.ecoville.dtos.login.LoginRequestDto;
import com.ecoville.dtos.login.LoginResponseDto;
import com.ecoville.servicos.login.LoginService;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/login")
public class LoginController {

    private final LoginService service;

    @PostMapping
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
        return service.authenticate(dto);
    }

}
