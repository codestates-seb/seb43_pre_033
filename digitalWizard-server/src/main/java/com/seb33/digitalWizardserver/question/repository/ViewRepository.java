package com.seb33.digitalWizardserver.question.repository;

import com.seb33.digitalWizardserver.question.entity.View;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewRepository extends JpaRepository<View, Long> {
}
