package com.scoretrackr.models;

public class RoundType {
    private String roundTypeId;
    private String name;

    public RoundType(){}

    public RoundType(String roundTypeId, String name){
        this.roundTypeId = roundTypeId;
        this.name = name;
    }

    public String getRoundTypeId() {
        return roundTypeId;
    }

    public void setRoundTypeId(String roundTypeId) {
        this.roundTypeId = roundTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
