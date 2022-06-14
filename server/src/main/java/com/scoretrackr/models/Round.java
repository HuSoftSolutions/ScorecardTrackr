package com.scoretrackr.models;

public class Round {
    private String roundId;

    public Round(){}

    public Round(String roundId){
        this.roundId = roundId;
    }

    public String getRoundId() {
        return roundId;
    }

    public void setRoundId(String roundId) {
        this.roundId = roundId;
    }
}
