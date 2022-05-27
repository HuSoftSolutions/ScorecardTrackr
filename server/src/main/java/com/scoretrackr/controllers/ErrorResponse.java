package com.scoretrackr.controllers;


import com.scoretrackr.domain.result.Result;
import com.scoretrackr.domain.result.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ErrorResponse {

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getStatus() == null || result.getStatus() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getStatus() == ResultType.NOT_FOUND) {
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }
}