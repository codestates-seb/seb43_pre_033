package com.seb33.digitalWizardserver.config;

import com.seb33.digitalWizardserver.auth.filter.JwtAuthenticationFilter;
import com.seb33.digitalWizardserver.auth.filter.JwtVerificationFilter;
import com.seb33.digitalWizardserver.auth.handler.MemberAccessDeniedHandler;
import com.seb33.digitalWizardserver.auth.handler.MemberAuthenticationEntryPoint;
import com.seb33.digitalWizardserver.auth.handler.MemberAuthenticationFailureHandler;
import com.seb33.digitalWizardserver.auth.handler.MemberAuthenticationSuccessHandler;
import com.seb33.digitalWizardserver.auth.jwt.JwtTokenizer;
import com.seb33.digitalWizardserver.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity // Spring Security를 사용하기 위한 필수 설정들을 자동으로 등록
@EnableGlobalMethodSecurity(prePostEnabled = true) // 메소드 보안 기능 활성화
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일 출처로부터 들어오는 request만 페이지 렌더링을 허용 (H2 웹 콘솔(개발단계용으로) 쓰기 위해 추가한거)
                .and()
                .csrf().disable()        // CSRF공격에 대한 Spring Security에 대한 설정을 비활성화
                .cors(withDefaults())    // CORS 설정 추가 (corsConfigurationSource라는 이름으로 등록된 Bean을 이용)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션을 생성하지 않도록 설정
                .and()
                .formLogin().disable()   // 폼 로그인 방식을 비활성화
                .httpBasic().disable()   // HTTP Basic 인증 방식을 비활성화
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 인증오류가 발생할 때 처리해주는 핸들러 호출
                .accessDeniedHandler(new MemberAccessDeniedHandler())  // 인증에는 성공했지만 해당 리소스에 대한 권한이 없을 때 처리해주는 핸들러 호출
                .and()
                .apply(new CustomFilterConfigurer())   // Custom Configurer 적용
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()                // 모든 HTTP request 요청에 대해서 접근 허용
//                                .antMatchers(HttpMethod.POST, "/*/members").permitAll() // 누구나 접근 가능
//                                .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")  // USER권한 있눈 사용자만
//                                .antMatchers(HttpMethod.GET, "/*/members").hasRole("ADMIN")
//                                .antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN")
//                                .antMatchers(HttpMethod.DELETE, "/*/members/**").hasRole("USER")
//                                .anyRequest().permitAll() // 위에 설정한 요청 외의 모든 요청 허용
                ).oauth2Login(withDefaults());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder(); // PasswordEncoder Bean 객체 생성
    }

    // CORS 정책 설정하는 방법
    @Bean
    CorsConfigurationSource corsConfigurationSource() { // CorsConfigurationSource Bean 생성을 통해 구체적인 CORS 정책을 설정
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE", "OPTIONS"));  // 파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(Boolean.valueOf(true));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();   // CorsConfigurationSource 인터페이스의 구현 클래스인 UrlBasedCorsConfigurationSource 클래스의 객체를 생성
        source.registerCorsConfiguration("/**", configuration);      // 모든 URL에 앞에서 구성한 CORS 정책(CorsConfiguration)을 적용
        return source;
    }

    // Custom Configurer 클래스 (JwtAuthenticationFilter를 등록하는 역할)
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // AbstractHttpConfigurer를 상속해서 Custom Configurer를 구현할 수 있다.
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // configure() 메서드를 오버라이드해서 Configuration을 커스터마이징
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // AuthenticationManager 객체 가져오기

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // JwtAuthenticationFilter를 생성하면서 JwtAuthenticationFilter에서 사용되는 AuthenticationManager와 JwtTokenizer를 DI
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login"); // setFilterProcessesUrl() 메서드를 통해 디폴트 request URL인 “/login”을 “/members/login”으로 변경
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // 인증 성공시 사용할 객체 등록
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // 인증 실패시 사용할 객체 등록
            // 빈등록으로 DI 안하고 new 쓴 이유는??
            // 일반적으로 인증을 위한 Security Filter마다 AuthenticationSuccessHandler와 AuthenticationFailureHandler의 구현 클래스를 각각 생성할 것이므로 new 키워드를 사용해서 객체를 생성해도 무방하다.

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // JwtVerificationFilter의 인스턴스를 생성하면서 JwtVerificationFilter에서 사용되는 객체들을 생성자로 DI

            builder.addFilter(jwtAuthenticationFilter)  // addFilter() 메서드를 통해 JwtAuthenticationFilter를 Spring Security Filter Chain에 추가
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);   // JwtVerificationFilter는 JwtAuthenticationFilter에서 로그인 인증에 성공한 후 발급 받은 JWT가 클라이언트의 request header(Authorization 헤더)에 포함되어 있을 경우에만 동작한다.
        }
    }
}
