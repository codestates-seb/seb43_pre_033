package com.seb33.digitalWizardserver.vote.repository;

import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.question.entity.Question;
import com.seb33.digitalWizardserver.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findByMemberAndQuestion(Member member, Question question);

    @Query(value = "SELECT COUNT(*) from Vote entity where entity.question = :question and entity.value = :value")
    Long sumByQuestionAndValue(@Param("question") Question question, @Param("value") int value);
}
