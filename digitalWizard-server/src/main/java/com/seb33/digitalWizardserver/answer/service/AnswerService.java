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

import java.util.Objects;
import java.util.Optional;

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
    public void create(Long questionId, String email, String body) {
        Question question = getQuestionOrException(questionId);
        Member member = getMemberOrException(email);
        answerRepository.save(Answer.of(member, question, body));
    }

    @Transactional
    public AnswerDto update(String body, String email, Long questionId, Long answerId) {
        Member member = getMemberOrException(email);
        Answer answer = getAnswerOrException(answerId);
        Question question = getQuestionOrException(questionId);
        checkAnswerMember(answer, member, email, answerId);
        checkAnswerQuestion(answer, question, questionId, answerId);
        answer.setBody(body);
        return AnswerDto.from(answerRepository.save(answer));
    }

    @Transactional
    public void delete(String email, Long questionId, Long answerId) {
        Member member = getMemberOrException(email);
        Question question = getQuestionOrException(questionId);
        Answer answer = getAnswerOrException(answerId);
        checkAnswerMember(answer, member, email, answerId);
        checkAnswerQuestion(answer, question, questionId, answerId);
        answerRepository.delete(answer);
    }

    @Transactional
    public void acceptAnswer(Long answerId, Long questionId, String email){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        if(optionalAnswer.isPresent()){
            Answer answer = optionalAnswer.get();
            Question question = answer.getQuestion();
            Member loggedInMember = getMemberOrException(email);

            if (question.getMember().equals(loggedInMember) && question.getQuestionId().equals(questionId)) {
                answer.acceptAnswer();
                answerRepository.save(answer);
            } else {
                throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, "답변을 채택할 권한이 없습니다.");
            }
        } else {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND, "해당 ID의 답변을 찾을 수 없습니다.");
        }
    }

    public Page<AnswerDto> answerList(Long questionId, Pageable pageable) {
        Question question = getQuestionOrException(questionId);
        return answerRepository.findAllByQuestion(question, pageable).map(AnswerDto::from);
    }

    private Question getQuestionOrException(Long questionId) {
        return questionRepository.findById(questionId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND, String.format("%s 번의 질문을 찾을수 없습니다.", questionId)));
    }

    private Member getMemberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 멤버를 찾을 수 없습니다.", email)));
    }

    private Answer getAnswerOrException(Long answerId) {
        return answerRepository.findById(answerId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND, String.format("%s 번의 답변을 찾을 수 없습니다.", answerId)));
    }

    private void checkAnswerMember(Answer answer, Member member, String email, Long answerId) {
        if (!Objects.equals(answer.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s의 권한을 가지고 있지 않습니다.", email, answerId));
        }
    }

    private void checkAnswerQuestion(Answer answer, Question question, Long questionId, Long answerId) {
        if (!Objects.equals(answer.getQuestion().getQuestionId(), question.getQuestionId())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 질문에 대한 %s 번의 답변이 아닙니다.", questionId, answerId));
        }
    }
}
