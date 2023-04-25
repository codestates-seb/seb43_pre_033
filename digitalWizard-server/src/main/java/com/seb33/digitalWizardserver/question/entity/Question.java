package com.seb33.digitalWizardserver.question.entity;

import com.seb33.digitalWizardserver.answer.entity.Answer;
import com.seb33.digitalWizardserver.audit.Auditable;
import com.seb33.digitalWizardserver.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Table
@Entity
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    private String title;

    @Column(columnDefinition = "TEXT", length = 10000)
    private String body;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<ImageUrl> imageUrls = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OrderBy("createdAt DESC")
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<Vote> votes;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    private List<View> view;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "question_hashtag",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "hashtag_id"))
    private List<Hashtag> hashtags = new ArrayList<>();

    public static Question of(String title, String body, Member member, List<Hashtag> hashtags, List<ImageUrl> imageUrls){
        Question question = new Question();
        question.setTitle(title);
        question.setBody(body);
        question.setMember(member);
        question.setHashtags(hashtags);

        for(ImageUrl imageUrl : imageUrls){
            imageUrl.setQuestion(question);
        }
        question.setImageUrls(imageUrls);
        return question;
    }
}
