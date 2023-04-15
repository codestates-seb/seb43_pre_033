package com.seb33.digitalWizardserver.answer.entity;

import com.seb33.digitalWizardserver.audit.Auditable;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.question.entity.Question;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Answer extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(columnDefinition = "TEXT")
    private String body;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(optional = false)
    @JoinColumn(name = "question_id")
    private Question question;

    public static Answer of(Member member, Question question, String body){
        Answer entity = new Answer();
        entity.setMember(member);
        entity.setQuestion(question);
        entity.setBody(body);
        return entity;
    }
}
