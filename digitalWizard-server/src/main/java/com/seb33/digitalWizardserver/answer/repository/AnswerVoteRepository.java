package com.seb33.digitalWizardserver.answer.repository;

import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.answer.entity.AnswerVote;
import com.seb33.digitalWizardserver.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {
    Optional<AnswerVote> findByMemberAndAnswer(Member member, Answer answer);
    @Query(value = "SELECT COUNT(*) from AnswerVote entity where entity.answer = :answer and entity.value = :value")
    Long sumByAnswerAndValue(@Param("answer")Answer answer, @Param("value") int value);
}
