package com.law.lawFeature.repository;


import com.law.lawFeature.model.Law;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
public interface LawRepository extends MongoRepository<Law, String> {
    Optional<Law> findByMainCategory(String mainCategory);
}
