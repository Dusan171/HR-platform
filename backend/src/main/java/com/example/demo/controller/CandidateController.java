package com.example.demo.controller;

import com.example.demo.model.Candidate;
import com.example.demo.service.CandidateService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Tag(name = "CandidateController", description = "API for managing candidates")
public class CandidateController {

    private final CandidateService candidateService;

    @PostMapping
    @Operation(summary = "Add a new candidate")
    public ResponseEntity<Candidate> addCandidate(@Valid @RequestBody Candidate candidate){
        return ResponseEntity.ok(candidateService.saveCandidate(candidate));
    }

    @GetMapping
    @Operation(summary = "Get all candidates")
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }
   
    
    @PutMapping("/{id}")
    @Operation(summary = "Update candidate")
    public ResponseEntity<Candidate> updateCandidate(@PathVariable Long id, @Valid @RequestBody Candidate candidateDetails){
        return ResponseEntity.ok(candidateService.updateCandidate(id, candidateDetails));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a candidate")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id){
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{candidateId}/skills/{skillId}")
    @Operation(summary = "Add a skill to a candidate")
    public ResponseEntity<Candidate> addSkillToCandidate(@PathVariable Long candidateId, @PathVariable Long skillId){
        return ResponseEntity.ok(candidateService.addSkillToCandidate(candidateId, skillId));
    }

    @DeleteMapping("/{candidateId}/skills/{skillId}")
    @Operation(summary = "Remove a skill from a candidate")
    public ResponseEntity<Void> removeSkillFromCandidate(@PathVariable Long candidateId, @PathVariable Long skillId){
        candidateService.removeSkillFromCandidate(candidateId, skillId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/search")
    @Operation(summary = "Search by full name")
    public List<Candidate> searchByFullName(@RequestParam String name) {
        return candidateService.searchByFullName(name);
    }

    @GetMapping("/search/skill")
    @Operation(summary= "Search by skill")
    public List<Candidate>searchBySkill(@RequestParam String skill){
        return candidateService.searchBySkill(skill);
    }
     @GetMapping("/{id}")
    @Operation(summary = "Get a candidate by ID")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id){
        return ResponseEntity.ok(candidateService.getCandidateById(id));
    }

}
