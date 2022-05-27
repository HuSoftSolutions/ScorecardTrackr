package com.scoretrackr.models;

public class RoundType {
    private int roundTypeId;
    private String name;

    public RoundType(){}

    public RoundType(int roundTypeId, String name){
        this.roundTypeId = roundTypeId;
        this.name = name;
    }

    public int getRoundTypeId() {
        return roundTypeId;
    }

    public void setRoundTypeId(int roundTypeId) {
        this.roundTypeId = roundTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
