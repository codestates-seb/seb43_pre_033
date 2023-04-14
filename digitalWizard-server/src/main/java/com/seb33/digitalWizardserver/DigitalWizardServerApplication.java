package com.seb33.digitalWizardserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DigitalWizardServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitalWizardServerApplication.class, args);
	}

}
