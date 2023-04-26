package com.seb33.digitalWizardserver.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ToString.Exclude
    @ManyToMany(mappedBy = "hashtags")
    private Set<Question> questions = new HashSet<>();


    public static Hashtag of(String name){
        Hashtag hashtag = new Hashtag();
        hashtag.setName(name);
        return hashtag;
    }
}
