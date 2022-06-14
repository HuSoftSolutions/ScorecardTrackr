package com.scoretrackr.models;

public class Team {
    private String teamId;
    private Match match;

    public Team(){}

    public Team(String teamId, Match match){
        this.teamId = teamId;
        this.match = match;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public Match getMatch() {
        return match;
    }

    public void setMatch(Match match) {
        this.match = match;
    }
}
