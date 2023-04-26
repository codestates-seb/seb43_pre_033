package com.seb33.digitalWizardserver.restdocs.member;

import com.google.gson.Gson;
import com.seb33.digitalWizardserver.auth.jwt.JwtTokenizer;
import com.seb33.digitalWizardserver.config.TestSecurityConfig;
import com.seb33.digitalWizardserver.member.controller.MemberController;
import com.seb33.digitalWizardserver.member.dto.MemberDto;
import com.seb33.digitalWizardserver.member.dto.MemberJoinResponseDto;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.mapper.MemberMapper;
import com.seb33.digitalWizardserver.member.service.MemberService;
import com.seb33.digitalWizardserver.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;
import java.util.List;

import static com.seb33.digitalWizardserver.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.seb33.digitalWizardserver.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@Import(TestSecurityConfig.class) // JWT 인증과정을 무시하기 위해 사용
public class MemberControllerRestDocsTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @Autowired
    private Gson gson;

    @Test
    @WithMockUser
    public void postMemberTest() throws Exception {
        // given
        MemberDto.PostMember post = new MemberDto.PostMember("test1@gmail.com", "firstPW111", "NickName1");
        String content = gson.toJson(post);

        MemberJoinResponseDto responseDto = makeMemberResponse(1L);

        // willReturn()이 최소한 null은 아니어야 한다.
        given(mapper.memberPostToMember(Mockito.any(MemberDto.PostMember.class))).willReturn(new Member());

        Member mockResultMember = new Member();
        mockResultMember.setMemberId(1L);
        given(memberService.createMember(Mockito.any(Member.class))).willReturn(mockResultMember);

        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseDto);

        // when
        ResultActions actions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/members/"))))
                .andDo(document("post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("memberNickName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
                                )
                        ),
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ));
    }

    @Test
    public void patchMemberTest() throws Exception {
        // given
        long memberId = 1L;
        MemberDto.Patch patch = new MemberDto.Patch(memberId, "changedNickName222", "changedPW222");
        String content = gson.toJson(patch);

        MemberJoinResponseDto responseDto =
                new MemberJoinResponseDto(1L,
                        "test1@gmail.com",
                        "https://avatars.githubusercontent.com/u/120456261?v=4",
                        "changedNickName222");

        // willReturn()이 최소한 null은 아니어야 한다.
        given(mapper.memberPatchToMember(Mockito.any(MemberDto.Patch.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(mapper.memberToMemberResponse(Mockito.any(Member.class))).willReturn(responseDto);

        Mockito.doNothing().when(memberService).sameMemberTest(Mockito.anyLong(), Mockito.anyString());

        // when
        ResultActions actions =
                mockMvc.perform(
                        patch("/members/{member-id}", memberId)
                                .header(HttpHeaders.AUTHORIZATION, "WishJWT " + "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlckVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwic3ViIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjgxODIxOTEwLCJleHAiOjE2ODE4MjM3MTB9.h_V93dhS-RhzqVdYuRkxHHIxYjG61LSn87a_8HtpBgM") // JWT 토큰 값 설정
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        // then
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(patch.getMemberId()))
                .andExpect(jsonPath("$.email").value(responseDto.getEmail()))
                .andExpect(jsonPath("$.profileImage").value(responseDto.getProfileImage()))
                .andExpect(jsonPath("$.memberNickName").value(patch.getMemberNickName()))
                .andDo(document("patch-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("JWT토큰")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                                        fieldWithPath("memberNickName").type(JsonFieldType.STRING).description("닉네임").optional(),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional()
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("profileImage").type(JsonFieldType.STRING).description("프로필 이미지"),
                                        fieldWithPath("memberNickName").type(JsonFieldType.STRING).description("닉네임")
                                )
                        )
                ));
    }

    @Test
    void getMemberTest() throws Exception {
        MemberJoinResponseDto response = makeMemberResponse(1L);

        given(memberService.findMember(Mockito.anyLong()))
                .willReturn(new Member());
        given(mapper.memberToMemberResponse(Mockito.any(Member.class)))
                .willReturn(response);


        mockMvc.perform(
                get("/members/{member-id}", response.getMemberId())
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        ).andExpectAll(
                status().isOk(),
                jsonPath("$.memberId").value(response.getMemberId()),
                jsonPath("$.email").value(response.getEmail()),
                jsonPath("$.profileImage").value(response.getProfileImage()),
                jsonPath("$.memberNickName").value(response.getMemberNickName())
        ).andDo(document("get-member",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                pathParameters(
                        parameterWithName("member-id").description("회원 식별자")
                ),
                responseFields(
                        List.of(
//                                fieldWithPath("uri").type(JsonFieldType.STRING).description("요청한 리소스의 URI 정보"),
                                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("profileImage").type(JsonFieldType.STRING).description("스탬프 갯수"),
                                fieldWithPath("memberNickName").type(JsonFieldType.STRING).description("닉네임")
                        )
                )
        ));

    }

    @Test
    void getMembersTest() throws Exception {
        Member member1 = makeMember(1L);
        Member member2 = makeMember(2L);

        MemberJoinResponseDto response = makeMemberResponse(1L);
        MemberJoinResponseDto response2 = makeMemberResponse(2L);

        int page = 1;
        int size = 10;

        Page<Member> pageList = new PageImpl<>(List.of(member1,member2), PageRequest.of(page-1,size, Sort.by("memberId").descending()),2);
        List<MemberJoinResponseDto> memberList = new ArrayList<>();
        memberList.add(response);
        memberList.add(response2);

        given(memberService.findMembers(Mockito.anyInt(),Mockito.anyInt()))
                .willReturn(pageList);
        given(mapper.membersToMemberResponses(Mockito.anyList()))
                .willReturn(memberList);

        mockMvc.perform(
                get("/members?page="+page+"&size="+size)
                        .accept(MediaType.APPLICATION_JSON)
        ).andExpectAll(
                status().isOk(),
                jsonPath("$.data[0].email").value(member1.getEmail()), // 페이지네이션 정렬에 따른 순서 주의
                jsonPath("$.data[1].email").value(member2.getEmail())
        ).andDo(document("get-members",
                getRequestPreProcessor(),
                getResponsePreProcessor(),
                requestParameters(
                        List.of(
                                parameterWithName("page").description("페이지 수"),
                                parameterWithName("size").description("페이지 당 Member 갯수")
                        )
                ), responseFields(
                        List.of(
//                                fieldWithPath("uri").type(JsonFieldType.STRING).description("요청한 리소스의 URI 정보"),
                                fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                fieldWithPath("data[].email").type(JsonFieldType.STRING).description("이메일"),
                                fieldWithPath("data[].profileImage").type(JsonFieldType.STRING).description("프로필 이미지"),
                                fieldWithPath("data[].memberNickName").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 수"),
                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지의 갯수"),
                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 원소"),
                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
                        )
                )));
    }

    @Test
    void deleteMemberTest() throws Exception { // 결론적으로 spring연결 확인하는 정도 밖에 의미 없음

        doNothing().when(memberService).deleteMember(Mockito.anyLong()); // 그나마 하나 있는 기능 아무것도 안하게 만들기

        mockMvc.perform(
                        delete("/members/{member-id}", 1L)
                                .header(HttpHeaders.AUTHORIZATION, "WishJWT " + "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlckVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwic3ViIjoidGVzdDFAZ21haWwuY29tIiwiaWF0IjoxNjgxODIxOTEwLCJleHAiOjE2ODE4MjM3MTB9.h_V93dhS-RhzqVdYuRkxHHIxYjG61LSn87a_8HtpBgM") // JWT 토큰 값 설정
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isNoContent())
                .andDo(document(
                        "delete-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("member-id").description("회원 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("JWT토큰")
                        )
                ));
    }

    public MemberJoinResponseDto makeMemberResponse(Long num) {
        MemberJoinResponseDto response = new MemberJoinResponseDto(num,
                "test"+ num +"@gmail.com",
                "https://avatars.githubusercontent.com/u/120456261?v=4",
                "NickName" + num);
        return response;
    }

    public Member makeMember(Long num){
        Member member = new Member(num,
                "NickName" + num,
                "test"+ num +"@gmail.com",
                "https://avatars.githubusercontent.com/u/120456261?v=4");
        return member;
    }

}