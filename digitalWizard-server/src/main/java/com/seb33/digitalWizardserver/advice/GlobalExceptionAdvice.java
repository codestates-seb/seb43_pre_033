package com.seb33.digitalWizardserver.advice;

import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.exception.Response.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(BusinessLogicException.class)
    public ResponseEntity<?> applicationHandler(BusinessLogicException e){
        log.error("Error occurs {}",e.toString());
        return ResponseEntity.status(e.getExceptionCode().getStatus())
                .body(Response.error(e.getExceptionCode().name()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> applicationHandler(RuntimeException e){
        log.error("Error occurs {}",e.toString());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Response.error(ExceptionCode.INTERNAL_SERVER_ERROR.name()));
    }
}
