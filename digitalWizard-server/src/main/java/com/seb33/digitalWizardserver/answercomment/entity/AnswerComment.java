package com.seb33.digitalWizardserver.answercomment.entity;


import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class AnswerComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerCommentId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    private Answer answer;

    private String body;

    protected AnswerComment() {
    }

    public AnswerComment(Member member, Answer answer, String body) {
        this.member = member;
        this.answer = answer;
        this.body = body;
    }

    public static AnswerComment of(Member member, Answer answer, String body) {
        return new AnswerComment(member, answer, body);
    }
}