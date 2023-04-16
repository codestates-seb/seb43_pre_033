package com.seb33.digitalWizardserver.question.service;

import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import com.seb33.digitalWizardserver.question.dto.QuestionDto;
import com.seb33.digitalWizardserver.question.entity.Question;
import com.seb33.digitalWizardserver.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;

    public QuestionService(QuestionRepository questionRepository, MemberRepository memberRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public void create(String title, String body, String email){
        Member member = getMemberOrException(email);
        questionRepository.save(Question.of(title, body, member));
    }

    @Transactional
    public QuestionDto update(String title, String body, String email, Long questionId){
        Member member = getMemberOrException(email);
        Question question = getQuestionOrException(questionId);
        if(question.getMember() != member){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 작성 유저가 권한을 가지고 있지 않습니다.", email));
        }
        question.setTitle(title);
        question.setBody(body);
        return QuestionDto.from(questionRepository.save(question));
    }

    public void delete(String email, Long questionId){
        Member member = getMemberOrException(email);
        Question question = getQuestionOrException(questionId);
        if (!Objects.equals(question.getMember().getMemberId(), member.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s 의 권한이 없습니다.", email,questionId));
        }
        questionRepository.delete(question);
    }
    @Transactional(readOnly = true)
    public QuestionDto findById(Long questionId){
        Question question = getQuestionOrException(questionId);
        return QuestionDto.from(question);
    }

    @Transactional(readOnly = true)
    public Page<QuestionDto> search(String keyword, Pageable pageable){
        return questionRepository.findByTitleContainingOrMember_MemberNickNameContaining(keyword, keyword, pageable).map(QuestionDto::from);
    }

    @Transactional(readOnly = true)
    public Page<QuestionDto> list(Pageable pageable){
        return questionRepository.findAll(pageable).map(QuestionDto::from);
    }

    @Transactional(readOnly = true)
    public Page<QuestionDto> myQuestionList(String email, Pageable pageable){
        Member member = getMemberOrException(email);
        return questionRepository.findAllByMember(member, pageable).map(QuestionDto::from);
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
