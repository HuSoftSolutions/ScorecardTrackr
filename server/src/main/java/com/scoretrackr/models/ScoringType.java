package com.scoretrackr.models;

public class ScoringType {
    private String scoringTypeId;
    private String name;

    public ScoringType(){}

    public ScoringType(String scoringTypeId, String name){
        this.scoringTypeId = scoringTypeId;
        this.name = name;
    }

    public String getScoringTypeId() {
        return scoringTypeId;
    }

    public void setScoringTypeId(String scoringTypeId) {
        this.scoringTypeId = scoringTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
