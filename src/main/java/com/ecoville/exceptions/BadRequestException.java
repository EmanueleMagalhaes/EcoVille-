package com.ecoville.exceptions;

public class BadRequestException  extends RuntimeException{
    BadRequestException(String message) {
        super(message);
    }
}
