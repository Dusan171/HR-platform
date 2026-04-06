package com.example.demo.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.Candidate;
import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    @Query("SELECT DISTINCT c FROM Candidate c LEFT JOIN FETCH c.skills")
    List<Candidate> findAllWithSkills();

    List<Candidate> findByFullNameContainingIgnoreCase(String fullName);

    List<Candidate> findBySkillsNameIgnoreCase(String skillName);

} 
    
