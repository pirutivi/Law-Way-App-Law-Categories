package com.law.lawFeature.controller;


import com.law.lawFeature.model.Law;
import com.law.lawFeature.repository.LawRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/laws")
@CrossOrigin("*")
public class LawController {

    @Autowired
    private LawRepository lawRepository;

    // Get all main categories
    @GetMapping("/main-categories")
    public List<String> getMainCategories() {
        return lawRepository.findAll()
                .stream()
                .map(Law::getMainCategory)
                .collect(Collectors.toList());
    }

    // Get subcategories for a selected main category
    @GetMapping("/{mainCategory}/subcategories")
    public List<String> getSubcategories(@PathVariable String mainCategory) {
        return lawRepository.findByMainCategory(mainCategory)
                .map(law -> law.getSubCategories()
                        .stream()
                        .map(Law.SubCategory::getName)
                        .collect(Collectors.toList()))
                .orElseThrow(() -> new RuntimeException("Main category not found"));
    }

    // Get laws for a selected subcategory
    @GetMapping("/{mainCategory}/{subCategory}/laws")
    public List<String> getLaws(@PathVariable String mainCategory, @PathVariable String subCategory) {
        return lawRepository.findByMainCategory(mainCategory)
                .flatMap(law -> law.getSubCategories()
                        .stream()
                        .filter(sub -> sub.getName().equalsIgnoreCase(subCategory))
                        .findFirst())
                .map(Law.SubCategory::getLaws)
                .orElseThrow(() -> new RuntimeException("Subcategory not found"));
    }

    // Get all laws
    @GetMapping
    public List<Law> getAllLaws() {
        return lawRepository.findAll();
    }

    // Add new law
    @PostMapping
    public Law addLaw(@RequestBody Law law) {
        return lawRepository.save(law);
    }
}

