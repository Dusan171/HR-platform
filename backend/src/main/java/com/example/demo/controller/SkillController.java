package com.example.demo.controller;

import com.example.demo.model.Skill;
import com.example.demo.service.SkillService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
@Tag(name = "Skill", description = "Endpoints for managing skills")
public class SkillController {

    private final SkillService skillService;

    @PutMapping
    @Operation(summary = "Add new skill")
    public ResponseEntity<Skill> addSkill(@Valid @RequestBody Skill skill){
    return ResponseEntity.ok(skillService.saveSkill(skill));
    }

    @GetMapping
    @Operation(summary = "Get all skills")
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete skill")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }
    
}
