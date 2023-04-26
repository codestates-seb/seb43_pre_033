package com.seb33.digitalWizardserver.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
public class ImageUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageUrl;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    public ImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setQuestion(Question question){
        this.question = question;
        question.getImageUrls().add(this);
    }
}
