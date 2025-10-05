package com.ecoville.exceptions;

public class BadRequestException  extends RuntimeException{
    BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(String parameter, String message) {
        super("Erro no parâmetro '" + parameter + "': " + message);
    }
}
