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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.seb33.digitalWizardserver.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.seb33.digitalWizardserver.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
        MemberDto.PostMember post = new MemberDto.PostMember("test1@gmail.com", "firstPW111", "firstNickName");
        String content = gson.toJson(post);

        MemberJoinResponseDto responseDto =
                new MemberJoinResponseDto(1L,
                        "test1@gmail.com",
                        "https://avatars.githubusercontent.com/u/120456261?v=4",
                        "firstNickName");

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
}