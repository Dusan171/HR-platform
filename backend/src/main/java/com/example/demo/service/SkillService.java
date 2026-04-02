package com.example.demo.service;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import com.example.demo.repository.SkillRepository;
import com.example.demo.model.Skill;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public Skill saveSkill (Skill skill){
        return skillRepository.findByNameIgnoreCase(skill.getName())
        .orElseGet(() -> skillRepository.save(skill));

    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public void deleteSkill(Long id){
        skillRepository.deleteById(id);
    }
    
}