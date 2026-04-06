package com.example.demo.config;

import com.example.demo.model.Candidate;
import com.example.demo.model.Skill;
import com.example.demo.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CandidateService candidateService;

    @Override
    public void run(String... args) {
        if (candidateService.getAllCandidates().isEmpty()) {

            Skill java = new Skill(); java.setName("Java");
            Skill react = new Skill(); react.setName("React");
            Skill sql = new Skill(); sql.setName("SQL");
            Skill docker = new Skill(); docker.setName("Docker");
            Skill typescript = new Skill(); typescript.setName("TypeScript");

            // 1. Marko Marković - Java & SQL
            Candidate c1 = new Candidate();
            c1.setFullName("Marko Markovic");
            c1.setEmail("marko@example.com");
            c1.setContactNumber("+38164111222");
            c1.setDateOfBirth(LocalDate.of(1992, 5, 15));
            c1.setSkills(new HashSet<>(Set.of(java, sql)));
            candidateService.saveCandidate(c1);

            // 2. Jelena Janković - React & TypeScript
            Candidate c2 = new Candidate();
            c2.setFullName("Jelena Jankovic");
            c2.setEmail("jelena@example.com");
            c2.setContactNumber("+38165333444");
            c2.setDateOfBirth(LocalDate.of(1995, 10, 20));
            c2.setSkills(new HashSet<>(Set.of(react, typescript)));
            candidateService.saveCandidate(c2);

            // 3. Nikola Nikolić - Java, SQL & Docker
            Candidate c3 = new Candidate();
            c3.setFullName("Nikola Nikolic");
            c3.setEmail("nikola@example.com");
            c3.setContactNumber("+38161555666");
            c3.setDateOfBirth(LocalDate.of(1988, 3, 10));
            c3.setSkills(new HashSet<>(Set.of(java, sql, docker)));
            candidateService.saveCandidate(c3);

            // 4. Sara Sarić - React & Java (Fullstack)
            Candidate c4 = new Candidate();
            c4.setFullName("Sara Saric");
            c4.setEmail("sara@example.com");
            c4.setContactNumber("+38162777888");
            c4.setDateOfBirth(LocalDate.of(1998, 12, 5));
            c4.setSkills(new HashSet<>(Set.of(react, java)));
            candidateService.saveCandidate(c4);

            // 5. Igor Igorić - Docker & SQL
            Candidate c5 = new Candidate();
            c5.setFullName("Igor Igoric");
            c5.setEmail("igor@example.com");
            c5.setContactNumber("+38163999000");
            c5.setDateOfBirth(LocalDate.of(1990, 7, 25));
            c5.setSkills(new HashSet<>(Set.of(docker, sql)));
            candidateService.saveCandidate(c5);

            System.out.println(">> Data Seeding: 5 candidates and their skills have been added to the database.");
        }
    }
}