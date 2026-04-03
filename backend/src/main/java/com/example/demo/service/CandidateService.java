package com.example.demo.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.SkillRepository;

import jakarta.transaction.Transactional;

import com.example.demo.model.Candidate;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import com.example.demo.model.Skill;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public Candidate saveCandidate(Candidate candidate) {
        if(candidate.getSkills() != null){
            Set<Skill> processedSkills = new HashSet<>();

            for(Skill skill: candidate.getSkills()){
                Skill existingSkill = getOrCreateSkill(skill);

                processedSkills.add(existingSkill);
            }

            candidate.setSkills(processedSkills);
        }
        return candidateRepository.save(candidate);
    }
    private Skill getOrCreateSkill(Skill skill) {
        if(skill.getId() != null){
            return skillRepository.findById(skill.getId())
            .orElseThrow(() -> new RuntimeException("Skill not found with id: " + skill.getId()));
        }
        return skillRepository.findByNameIgnoreCase(skill.getName())
            .orElseGet(() -> skillRepository.save(skill));
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public void deleteCandidate (Long id){
        Candidate candidate = getCandidateById(id);
        candidateRepository.delete(candidate);
    }

    public Candidate updateCandidate(Long id, Candidate candidateInfo){
        Candidate candidate = getCandidateById(id);
        candidate.setFullName(candidateInfo.getFullName());
        candidate.setDateOfBirth(candidateInfo.getDateOfBirth());
        candidate.setEmail(candidateInfo.getEmail());
        candidate.setContactNumber(candidateInfo.getContactNumber());
        candidate.setSkills(candidateInfo.getSkills());
        return candidateRepository.save(candidate);
    }
    public Candidate getCandidateById (Long id){
        return candidateRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }

    public List<Candidate> searchByFullName(String name) {
        return candidateRepository.findByFullNameContainingIgnoreCase(name);
    }
    public List<Candidate> searchBySkill (String skillName) {
        return candidateRepository.findBySkillsNameIgnoreCase(skillName);
    }

    @Transactional
    public Candidate addSkillToCandidate(Long candidateId, Long skillId) {
        Candidate candidate = getCandidateById(candidateId);
        var skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + skillId));
        candidate.getSkills().add(skill);
        return candidateRepository.save(candidate);
    }

    @Transactional
    public Candidate removeSkillFromCandidate(Long candidateId, Long skillId) {
        Candidate candidate = getCandidateById(candidateId);
        var skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found with id: " + skillId));
        candidate.getSkills().remove(skill);
        return candidateRepository.save(candidate);
    }

}
