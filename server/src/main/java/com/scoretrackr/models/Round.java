package com.scoretrackr.models;

public class Round {
    private String roundId;
    private RoundType roundType;

    public Round(){}

    public Round(String roundId, RoundType roundType){
        this.roundId = roundId;
        this.roundType = roundType;
    }

    public String getRoundId() {
        return roundId;
    }

    public void setRoundId(String roundId) {
        this.roundId = roundId;
    }

    public RoundType getRoundType() {
        return roundType;
    }

    public void setRoundType(RoundType roundType) {
        this.roundType = roundType;
    }
}
