package com.seb33.digitalWizardserver.member.entity;

import com.seb33.digitalWizardserver.audit.Auditable;
import com.seb33.digitalWizardserver.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {
    @Id // 식별자 등록
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 식별자를 자동으로 생성
    private Long memberId;
    private String memberName;
    private String memberNickName;
    private String email;

//    @Column
    private String profileImage;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER) // 별도의 테이블로 생성해서 저장 // 권한 여러개 설정할거면 나중에 바꾸기 (String roles 지우고 관련 메서드 체크!)
    private List<String> roles = new ArrayList<>(); // 권한 테이블

    @OneToMany(mappedBy = "member")         // Post, Answer, AnswerComent Entity 생성 후 주석 해제
    private List<Question> posts = new ArrayList<>();

//
//    @OneToMany(mappedBy = "member")
//    private List<Answer> answers = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<AnswerComent> answerComents = new ArrayList<>();
//
//    @OneToMany(mappedBy = "saveMember")
//    private List<Post> savePosts = new ArrayList<>();
//
//    @OneToMany(mappedBy = "saveMember")
//    private List<Answer> saveAnswers = new ArrayList<>();

//    @OneToMany(mappedBy = "member")           // Notification Entity 생성 후 주석 해제
//    private List<Notification> notifications = new ArrayList<>();

    private String location;

    private String title;

    private String aboutMe;

}
