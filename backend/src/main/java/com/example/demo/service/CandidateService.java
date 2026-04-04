package com.example.demo.service;

import com.example.demo.model.Candidate;
import com.example.demo.model.Skill;
import com.example.demo.repository.CandidateRepository;
import com.example.demo.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public Candidate saveCandidate(Candidate candidate) {
        candidate.setSkills(getManagedSkills(candidate.getSkills()));
        return candidateRepository.save(candidate);
    }

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidate not found with id: " + id));
    }

    @Transactional
    public Candidate updateCandidate(Long id, Candidate candidateDetails) {
        Candidate candidateFromDb = getCandidateById(id);
 
        candidateFromDb.setFullName(candidateDetails.getFullName());
        candidateFromDb.setDateOfBirth(candidateDetails.getDateOfBirth());
        candidateFromDb.setContactNumber(candidateDetails.getContactNumber());
        candidateFromDb.setEmail(candidateDetails.getEmail());
    
        candidateFromDb.getSkills().clear();
        candidateFromDb.getSkills().addAll(getManagedSkills(candidateDetails.getSkills()));
        
        return candidateRepository.save(candidateFromDb);
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }

    private Set<Skill> getManagedSkills(Set<Skill> skills) {
        Set<Skill> managedSkills = new HashSet<>();
        if (skills != null) {
            for (Skill s : skills) {
                Skill managed = skillRepository.findByNameIgnoreCase(s.getName())
                        .orElseGet(() -> {
                            Skill newSkill = new Skill();
                            newSkill.setName(s.getName());
                            return skillRepository.save(newSkill);
                        });
                managedSkills.add(managed);
            }
        }
        return managedSkills;
    }

    public List<Candidate> searchByFullName(String name) {
        return candidateRepository.findByFullNameContainingIgnoreCase(name);
    }

    public List<Candidate> searchBySkill(String skillName) {
        return candidateRepository.findBySkillsNameIgnoreCase(skillName);
    }
}