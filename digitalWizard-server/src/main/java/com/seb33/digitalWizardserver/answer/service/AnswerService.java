package com.seb33.digitalWizardserver.answer.service;

import com.seb33.digitalWizardserver.answer.dto.AnswerDto;
import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.answer.repository.AnswerRepository;
import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import com.seb33.digitalWizardserver.question.entity.Question;
import com.seb33.digitalWizardserver.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnswerService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;

    public AnswerService(QuestionRepository questionRepository, AnswerRepository answerRepository, MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void answer(Long questionId, String email, String body){
        Question question = getQuestionOrException(questionId);
        Member member = getMemberOrException(email);
        answerRepository.save(Answer.of(member, question, body));
    }

    public Page<AnswerDto> answerList(Long questionId, Pageable pageable){
        Question question = getQuestionOrException(questionId);
        return answerRepository.findAllByQuestion(question, pageable).map(AnswerDto::from);
    }

    private Question getQuestionOrException(Long questionId){
        return questionRepository.findById(questionId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND, String.format("%s 번의 질문을 찾을수 없습니다.", questionId)));
    }

    private Member getMemberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 멤버를 찾을 수 없습니다.", email)));
    }
}
