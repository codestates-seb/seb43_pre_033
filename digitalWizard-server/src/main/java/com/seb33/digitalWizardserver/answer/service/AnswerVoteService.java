package com.seb33.digitalWizardserver.answer.service;

import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.answer.entity.AnswerVote;
import com.seb33.digitalWizardserver.answer.repository.AnswerRepository;
import com.seb33.digitalWizardserver.answer.repository.AnswerVoteRepository;
import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnswerVoteService {

    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final AnswerVoteRepository answerVoteRepository;

    public AnswerVoteService(AnswerRepository answerRepository, MemberRepository memberRepository, AnswerVoteRepository answerVoteRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.answerVoteRepository = answerVoteRepository;
    }

    @Transactional
    public void like(Long answerId, String email){
        Answer answer = getAnswerOrException(answerId);
        Member member = getMemberOrException(email);

        answerVoteRepository.findByMemberAndAnswer(member, answer).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTE, String.format("%s 이미 투표를 진행하였습니다.", email));
        });
        answerVoteRepository.save(AnswerVote.of(member, answer, 1));
    }

    @Transactional
    public void hate(Long answerId, String email){
        Answer answer = getAnswerOrException(answerId);
        Member member = getMemberOrException(email);

        answerVoteRepository.findByMemberAndAnswer(member, answer).ifPresent(it -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_VOTE, String.format("%s 이미 투표를 진행하였습니다.",email));
        });
        answerVoteRepository.save(AnswerVote.of(member,answer,-1));
    }
    @Transactional(readOnly = true)
    public Long resultCount(Long answerId){
        Answer answer = getAnswerOrException(answerId);
        Long likeCount = answerVoteRepository.sumByAnswerAndValue(answer, 1);
        Long hateCount = answerVoteRepository.sumByAnswerAndValue(answer, -1);
        return likeCount - hateCount;
    }

    private Answer getAnswerOrException(Long answerId){
        return answerRepository.findById(answerId).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND, String.format("%s 번의 답변을 찾을수 없습니다.", answerId)));
    }

    private Member getMemberOrException(String email){
        return memberRepository.findByEmail(email).orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 멤버를 찾을 수 없습니다.", email)));
    }
}
