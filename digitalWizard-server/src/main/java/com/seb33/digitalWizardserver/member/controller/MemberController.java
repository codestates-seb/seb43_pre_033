package com.seb33.digitalWizardserver.member.controller;

import com.seb33.digitalWizardserver.member.dto.MemberDto;
import com.seb33.digitalWizardserver.member.mapper.MemberMapper;
import com.seb33.digitalWizardserver.member.service.MemberService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@AllArgsConstructor
@RestController
@RequestMapping("/members")
@Validated // 유효성 검사용
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper memberMapper;

//    @PostMapping
//    public ResponseEntity postMember(@Valid @RequestBody MemberDto.PostMember requestBody) {
//    }
//
//    @PatchMapping("/{member-id}")
//    public ResponseEntity patchMember(
//            @PathVariable("member-id") @Positive long memberId,
//            @Valid @RequestBody MemberDto.Patch requestBody) {
//
//    }
//
//    @GetMapping("/{member-id}")
//    public ResponseEntity getMember(
//            @PathVariable("member-id") @Positive long memberId) {
//
//    }
//
//    @GetMapping
//    public ResponseEntity getMembers(@Positive @RequestParam int page,
//                                     @Positive @RequestParam int size) {
//
//    }
//
//    @DeleteMapping("/{member-id}")
//    public ResponseEntity deleteMember(
//            @PathVariable("member-id") @Positive long memberId) {
//
//    }

    @GetMapping
    public String getMembers() {
        return "성공";
    }
}
