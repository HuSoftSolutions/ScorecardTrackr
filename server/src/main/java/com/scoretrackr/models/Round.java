package com.scoretrackr.models;

public class Round {
    private int roundId;
    private RoundType roundType;

    public Round(){}

    public Round(int roundId, RoundType roundType){
        this.roundId = roundId;
        this.roundType = roundType;
    }

    public int getRoundId() {
        return roundId;
    }

    public void setRoundId(int roundId) {
        this.roundId = roundId;
    }

    public RoundType getRoundType() {
        return roundType;
    }

    public void setRoundType(RoundType roundType) {
        this.roundType = roundType;
    }
}
