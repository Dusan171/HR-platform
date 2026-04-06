package com.example.demo.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.demo.model.Candidate;
import com.example.demo.model.Skill;
import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.SkillRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@ExtendWith(MockitoExtension.class) 
public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository; 

    @Mock
    private SkillRepository skillRepository; 

    @InjectMocks
    private CandidateService candidateService; 

    @Test
    void testSaveCandidate_Success() {
        // Arrange
        Candidate candidate = new Candidate();
        candidate.setFullName("Marko Markovic");
        candidate.setEmail("marko@example.com");
        candidate.setDateOfBirth(LocalDate.of(1990, 1, 1));
        candidate.setContactNumber("123456");

        Skill javaSkill = new Skill();
        javaSkill.setName("Java");
        candidate.setSkills(new HashSet<>(Set.of(javaSkill)));

        when(skillRepository.findByNameIgnoreCase("Java")).thenReturn(Optional.of(javaSkill));
        when(candidateRepository.save(any(Candidate.class))).thenReturn(candidate);

        // Act
        Candidate savedCandidate = candidateService.saveCandidate(candidate);

        // Assert
        assertNotNull(savedCandidate);
        assertEquals("Marko Markovic", savedCandidate.getFullName());
        verify(candidateRepository, times(1)).save(any(Candidate.class)); 
    }

    @Test
    void testGetCandidateById_Success() {
        // Arrange
        Candidate c = new Candidate();
        c.setId(1L);
        c.setFullName("Ana Anić");
        when(candidateRepository.findById(1L)).thenReturn(Optional.of(c));

        // Act
        Candidate found = candidateService.getCandidateById(1L);

        // Assert
        assertNotNull(found);
        assertEquals("Ana Anić", found.getFullName());
    }

    @Test
    void testGetCandidateById_NotFound() {
        // Arrange
        when(candidateRepository.findById(99L)).thenReturn(Optional.empty());

        // Act & Assert 
        assertThrows(RuntimeException.class, () -> {
            candidateService.getCandidateById(99L);
        });
    }

    @Test
    void testDeleteCandidate() {
        // Act
        candidateService.deleteCandidate(1L);

        // Assert 
        verify(candidateRepository, times(1)).deleteById(1L);
    }
}