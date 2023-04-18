package com.seb33.digitalWizardserver.question.repository;

import com.seb33.digitalWizardserver.question.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    Optional<Hashtag> findByName(String name);
}
