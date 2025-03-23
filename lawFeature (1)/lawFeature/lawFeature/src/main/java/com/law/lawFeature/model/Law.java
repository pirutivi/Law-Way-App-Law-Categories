package com.law.lawFeature.model;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.List;

@Document(collection = "laws")
public class Law {

    @Id
    private String id;

    private String mainCategory;
    private List<SubCategory> subCategories;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMainCategory() {
        return mainCategory;
    }

    public void setMainCategory(String mainCategory) {
        this.mainCategory = mainCategory;
    }

    public List<SubCategory> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubCategory> subCategories) {
        this.subCategories = subCategories;
    }

    // Inner class for SubCategory
    public static class SubCategory {
        private String name;
        private List<String> laws;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public List<String> getLaws() {
            return laws;
        }

        public void setLaws(List<String> laws) {
            this.laws = laws;
        }
    }
}

