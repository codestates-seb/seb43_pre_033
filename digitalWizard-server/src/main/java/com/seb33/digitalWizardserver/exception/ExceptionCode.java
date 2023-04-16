package com.seb33.digitalWizardserver.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum ExceptionCode {

    DUPLICATED_EMAIL(409, "이메일을 찾을수 없습니다."),
    MEMBER_EXISTS(409, "이메일이 이미 존재"),
    MEMBER_NOT_FOUND(404, "멤버를 찾을수 없습니다."),
    INTERNAL_SERVER_ERROR(500, "내부 서버 오류"),

    QUESTION_NOT_FOUND(404, "질문을 찾을 수 없습니다."),
    ANSWER_NOT_FOUND(404,"답변을 찾을 수 없습니다."),
    INVALID_REQUEST(400, "잘못된 요청 입니다."),
    ALREADY_VOTE(409,"이미 투표를 하였습니다."),
    INVALID_PERMISSION(403, "권한이 유효하지 않습니다.");
    @Getter
    private int status;
    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}