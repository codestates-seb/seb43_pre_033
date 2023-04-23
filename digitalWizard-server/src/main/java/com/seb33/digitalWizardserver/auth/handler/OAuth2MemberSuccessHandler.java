package com.seb33.digitalWizardserver.auth.handler;

import com.seb33.digitalWizardserver.auth.jwt.JwtTokenizer;
import com.seb33.digitalWizardserver.auth.utils.CustomAuthorityUtils;
import com.seb33.digitalWizardserver.member.entity.Member;
import com.seb33.digitalWizardserver.member.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//  OAuth 2 인증 후, Frontend 애플리케이션 쪽으로 JWT를 전송하는 역할
@Service
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberService memberService;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      CustomAuthorityUtils authorityUtils,
                                      MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email")); // OAuth2User 객체로부터 Resource Owner의 이메일 주소를 얻기
        String nickName = String.valueOf(oAuth2User.getAttributes().get("name")); // 이름을 얻기
        String profileImage = String.valueOf(oAuth2User.getAttributes().get("picture")); // 프로필 이미지 URL을 얻기

        List<String> authorities = authorityUtils.createRoles(email);           // 권한 정보 생성

        Member member = saveMember(email, nickName, profileImage);  // Resource Owner의 정보를 DB에 저장
        redirect(request, response, member, authorities);  // Access Token과 Refresh Token을 생성해서 Frontend 애플리케이션에 전달하기 위해 Redirect
    }

    private Member saveMember(String email, String nickname, String profileImage) {
        Member member = new Member(nickname, email, profileImage);
        memberService.createMember(member);

        return member;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member, authorities);  // JWT Access Token 생성
        String refreshToken = delegateRefreshToken(member.getEmail());  // Refresh Token 생성

        String uri = createURI(accessToken, refreshToken).toString();   // Access Token과 Refresh Token을 포함한 URL을 생성
        getRedirectStrategy().sendRedirect(request, response, uri);   // Frontend 애플리케이션 쪽으로 리다이렉트
    }

    private String delegateAccessToken(Member member, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberEmail", member.getEmail());
        claims.put("memberNickName", member.getMemberNickName());
        claims.put("roles", authorities);

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost") // Todo 리액트 서버 도메인 주소 입력
                .port(3000) // Todo 포트번호 변경 주의
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
