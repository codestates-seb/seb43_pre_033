package com.seb33.digitalWizardserver.answer.entity;

import com.seb33.digitalWizardserver.audit.Auditable;
import com.seb33.digitalWizardserver.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class AnswerVote extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerVoteId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    private int value;

    public static AnswerVote of(Member member, Answer answer, int value){
        AnswerVote entity = new AnswerVote();
        entity.setMember(member);
        entity.setAnswer(answer);
        entity.setValue(value);
        return entity;
    }
}
