package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;
import java.util.HashSet;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Skill name is mandatory")
    @Size(min = 2, max = 50, message = "Skill name must be between 2 and 50 characters")
    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "skills")
    @JsonIgnore
    private Set<Candidate> candidates = new HashSet<>() ;
}
