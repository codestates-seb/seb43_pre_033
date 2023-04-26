package com.seb33.digitalWizardserver.answercomment.repository;


import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.answercomment.entity.AnswerComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Long> {
    Page<AnswerComment> findAllByAnswer(Answer answer, Pageable pageable);
}