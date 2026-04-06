package com.example.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.demo.model.Candidate;
import com.example.demo.service.CandidateService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;

@WebMvcTest(CandidateController.class) 
public class CandidateControllerTest {

    @Autowired
    private MockMvc mockMvc; 

    @MockitoBean
    private CandidateService candidateService; 

    @Autowired
    private ObjectMapper objectMapper; 

    @Test
    void shouldGetAllCandidates() throws Exception {
        // Arrange
        Candidate c1 = new Candidate();
        c1.setFullName("Marko Markovic");
        when(candidateService.getAllCandidates()).thenReturn(Arrays.asList(c1));

        // Act & Assert
        mockMvc.perform(get("/api/candidates")) 
                .andExpect(status().isOk()) 
                .andExpect(jsonPath("$[0].fullName").value("Marko Markovic")); 
    }

    @Test
    void shouldCreateCandidateSuccessfully() throws Exception {
        // Arrange
        Candidate candidate = new Candidate();
        candidate.setFullName("Nikola Nikolic");
        candidate.setEmail("nikola@example.com");
        candidate.setContactNumber("064123456");
        candidate.setDateOfBirth(LocalDate.of(1995, 5, 20));

        when(candidateService.saveCandidate(any(Candidate.class))).thenReturn(candidate);

        // Act & Assert
        mockMvc.perform(post("/api/candidates") 
                .contentType(MediaType.APPLICATION_JSON) 
                .content(objectMapper.writeValueAsString(candidate))) 
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Nikola Nikolic"));
    }

    @Test
    void shouldReturnBadRequestWhenNameIsEmpty() throws Exception {
        // Arrange 
        Candidate invalidCandidate = new Candidate();
        invalidCandidate.setEmail("invalid@example.com");

        // Act & Assert
        mockMvc.perform(post("/api/candidates")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidCandidate)))
                .andExpect(status().isBadRequest()); 
    }

    @Test
    void shouldSearchCandidatesBySkill() throws Exception {
        // Arrange
        Candidate c = new Candidate();
        c.setFullName("Java Developer");
        when(candidateService.searchBySkill("Java")).thenReturn(Arrays.asList(c));

        // Act & Assert
        mockMvc.perform(get("/api/candidates/search/skill")
                .param("skill", "Java")) 
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("Java Developer"));
    }
}