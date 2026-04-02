package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Candidate;
import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByFullNameContainingIgnoreCase(String fullName);

    List<Candidate> findBySkillsNameIgnoreCase(String skillName);

} 
    
