package com.seb33.digitalWizardserver.answercomment.service;


import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.answer.repository.AnswerRepository;
import com.seb33.digitalWizardserver.answercomment.dto.AnswerCommentDto;
import com.seb33.digitalWizardserver.answercomment.entity.AnswerComment;
import com.seb33.digitalWizardserver.answercomment.repository.AnswerCommentRepository;
import com.seb33.digitalWizardserver.exception.BusinessLogicException;
import com.seb33.digitalWizardserver.exception.ExceptionCode;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class AnswerCommentService {


    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final AnswerCommentRepository answerCommentRepository;

    public AnswerCommentService(AnswerRepository answerRepository, MemberRepository memberRepository,
                                AnswerCommentRepository answerCommentRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.answerCommentRepository = answerCommentRepository;
    }

    @Transactional
    public void create(Long answerId, String email, String body) {
        Answer answer = getAnswerOrException(answerId);
        Member member = getMemberOrException(email);
        answerCommentRepository.save(AnswerComment.of(member, answer, body));
    }


    @Transactional
    public AnswerCommentDto update(String body, String email, Long answerId, Long answerCommentId) {
        Member member = getMemberOrException(email);
        AnswerComment answerComment = getAnswerCommentOrException(answerCommentId);
        checkAnswerCommentMember(answerComment, member, email, answerId);
        checkAnswerComment(answerComment, answerCommentId, answerId);
        answerComment.setBody(body);
        return AnswerCommentDto.from(answerCommentRepository.save(answerComment));
    }


    @Transactional
    public void delete(String email, Long answerCommentId, Long answerId) {
        Member member = getMemberOrException(email);
        AnswerComment answerComment = getAnswerCommentOrException(answerCommentId);
        checkAnswerCommentMember(answerComment, member, email, answerId);
        checkAnswerComment(answerComment, answerCommentId, answerId);
        answerCommentRepository.delete(answerComment);
    }


    public Page<AnswerCommentDto> commentList(Long answerId, Pageable pageable) {
        Answer answer = getAnswerOrException(answerId);
        return answerCommentRepository.findAllByAnswer(answer, pageable).map(AnswerCommentDto::from);
    }

    private Member getMemberOrException(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND, String.format("%s 멤버를 찾을 수 없습니다.", email)));
    }

    private Answer getAnswerOrException(Long answerId) {
        return answerRepository.findById(answerId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND, String.format("%d 답변을 찾을 수 없습니다.", answerId)));
    }

    private AnswerComment getAnswerCommentOrException(Long answerCommentId) {
        return answerCommentRepository.findById(answerCommentId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND, String.format("%s 번의 댓글을 찾을 수 없습니다.", answerCommentId)));
    }

    private void checkAnswerCommentMember(AnswerComment answerComment, Member member, String email, Long answerId) {
        if (!Objects.equals(answerComment.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PERMISSION, String.format("%s 는 %s의 권한을 가지고 있지 않습니다.", email, answerId));
        }
    }

    private void checkAnswerComment(AnswerComment answerComment, Long answerCommentId, Long answerId) {
        if (!Objects.equals(answerComment.getAnswer().getAnswerId(), answerId)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REQUEST, String.format("%s 번의 답변에 대한 %s 번의 댓글이 아닙니다.", answerId, answerCommentId));
        }
    }
}