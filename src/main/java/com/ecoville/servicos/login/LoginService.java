package com.ecoville.servicos.login;

import com.ecoville.dtos.login.LoginRequestDto;
import com.ecoville.dtos.login.LoginResponseDto;

public interface LoginService {

    LoginResponseDto authenticate(LoginRequestDto dto);

}
