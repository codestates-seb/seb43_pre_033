package com.seb33.digitalWizardserver.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ExceptionCode {

    DUPLICATED_EMAIL(HttpStatus.CONFLICT, "이메일을 찾을수 없습니다."),
    MEMBER_EXISTS(HttpStatus.CONFLICT, "이메일이 이미 존재"),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "멤버를 찾을수 없습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "내부 서버 오류"),

    QUESTION_NOT_FOUND(HttpStatus.NOT_FOUND, "질문을 찾을 수 없습니다."),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "권한이 유효하지 않습니다."),
    ;
    private HttpStatus status;
    private String message;

    ExceptionCode(HttpStatus status, String message){
        this.status = status;
        this.message = message;
    }
}