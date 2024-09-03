package com.example.usermanage.controllers;


import com.example.usermanage.configs.ChangePassword;
import com.example.usermanage.dtos.MailBody;
import com.example.usermanage.entities.ForgotPassword;
import com.example.usermanage.entities.OurUsers;
import com.example.usermanage.repositories.ForgotPasswordRepo;
import com.example.usermanage.repositories.UsersRepo;
import com.example.usermanage.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private final UsersRepo usersRepo;
    private final EmailService emailService;

    private final ForgotPasswordRepo forgotPasswordRepo;

    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UsersRepo usersRepo, EmailService emailService, ForgotPasswordRepo forgotPasswordRepo, PasswordEncoder passwordEncoder) {
        this.usersRepo = usersRepo;
        this.emailService = emailService;
        this.forgotPasswordRepo = forgotPasswordRepo;
        this.passwordEncoder = passwordEncoder;
    }


    // send mail for email verification
    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {

        OurUsers user = usersRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide an valid email!" + email));

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("This is the OTP for your Forgot Password request : " + otp)
                .subject("OTP for Forgot Password request")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 200 * 1000))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepo.save(fp);

        return ResponseEntity.ok("Email sent for verification!");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        // Find the user by email
        OurUsers user = usersRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email!"));

        // Find the OTP associated with the user
        ForgotPassword fp = forgotPasswordRepo.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("Invalid OTP for email: " + email));

        // Log the expiration time and current time for debugging
        System.out.println("Expiration Time: " + fp.getExpirationTime());
        System.out.println("Current Time: " + Date.from(Instant.now()));

        // Compare expiration time with current time
        if (fp.getExpirationTime().before(Date.from(Instant.now(Clock.system(ZoneOffset.UTC))))) {
            forgotPasswordRepo.deleteById(fp.getFpid());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }

        // If everything is correct, OTP is verified
        return ResponseEntity.ok("OTP verified!");
    }


    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody ChangePassword changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        usersRepo.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed!");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}