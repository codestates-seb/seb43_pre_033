package com.seb33.digitalWizardserver.question.service;

import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import com.seb33.digitalWizardserver.question.entity.Question;
import com.seb33.digitalWizardserver.question.repository.QuestionRepository;
import com.seb33.digitalWizardserver.question.entity.Vote;
import com.seb33.digitalWizardserver.question.repository.VoteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VoteService {

    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final VoteRepository voteRepository;

    public VoteService(QuestionRepository questionRepository, MemberRepository memberRepository, VoteRepository voteRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
        this.voteRepository = voteRepository;
    }

    @Transactional
    public void like(Long questionId, String email) {
        Question question = getQuestionOrException(questionId);
        Member member = getMemberOrException(email);

        voteRepository.findByMemberAndQuestion(member, question).ifPresent(it ->{
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTE, String.format("%s 이미 투표를 하셨습니다.", email));
        });
        voteRepository.save(Vote.of(member, question, 1));
    }

    @Transactional
    public void hate(Long questionId, String email) {
        Question question = getQuestionOrException(questionId);
        Member member = getMemberOrException(email);

        voteRepository.findByMemberAndQuestion(member, question).ifPresent(it ->{
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTE, String.format("%s 이미 투표를 하셨습니다.", email));
        });
        voteRepository.save(Vote.of(member, question, -1));
    }

    @Transactional(readOnly = true)
    public Long resultCount(Long questionId) {
        Question question = getQuestionOrException(questionId);
        Long likeCount = voteRepository.sumByQuestionAndValue(question, 1);
        Long hateCount = voteRepository.sumByQuestionAndValue(question, -1);
        return likeCount - hateCount;
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
