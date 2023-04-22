package com.seb33.digitalWizardserver.question.entity;

import com.seb33.digitalWizardserver.audit.Auditable;
import com.seb33.digitalWizardserver.member.entity.Member;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
public class Vote extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private int value;

    public static Vote of(Member member, Question question,int value){
        Vote entity = new Vote();
        entity.setMember(member);
        entity.setQuestion(question);
        entity.setValue(value);
        return entity;
    }
}