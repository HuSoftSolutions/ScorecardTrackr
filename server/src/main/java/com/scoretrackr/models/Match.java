package com.scoretrackr.models;

public class Match {
    private String matchId;
    private Round round;
    private ScoringType scoringType;
    private MatchFormat matchFormat;
    private MatchType matchType;

    public Match(){}

    public Match(String matchId, Round round, ScoringType scoringType, MatchFormat matchFormat, MatchType matchType){
        this.matchId = matchId;
        this.round = round;
        this.scoringType = scoringType;
        this.matchFormat = matchFormat;
        this.matchType = matchType;
    }

    public String getMatchId() {
        return matchId;
    }

    public void setMatchId(String matchId) {
        this.matchId = matchId;
    }

    public Round getRound() {
        return round;
    }

    public void setRound(Round round) {
        this.round = round;
    }

    public ScoringType getScoringType() {
        return scoringType;
    }

    public void setScoringType(ScoringType scoringType) {
        this.scoringType = scoringType;
    }

    public MatchFormat getMatchFormat() {
        return matchFormat;
    }

    public void setMatchFormat(MatchFormat matchFormat) {
        this.matchFormat = matchFormat;
    }

    public MatchType getMatchType() {
        return matchType;
    }

    public void setMatchType(MatchType matchType) {
        this.matchType = matchType;
    }
}
