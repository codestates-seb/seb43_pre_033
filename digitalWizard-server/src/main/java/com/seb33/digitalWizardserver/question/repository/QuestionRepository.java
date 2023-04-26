package com.seb33.digitalWizardserver.question.repository;

import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByMember(Member member, Pageable pageable);
    Page<Question> findByTitleContaining(String keyword, Pageable pageable);
    Page<Question> findByTitleContainingOrMember_MemberNickNameContaining(String keyword1, String keyword2, Pageable pageable);
}
