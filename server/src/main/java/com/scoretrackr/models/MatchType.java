package com.scoretrackr.models;

public class MatchType {
    private String matchTypeId;
    private String name;

    public MatchType(){}

    public MatchType(String matchTypeId, String name){
        this.matchTypeId = matchTypeId;
        this.name = name;
    }

    public String getMatchTypeId() {
        return matchTypeId;
    }

    public void setMatchTypeId(String matchTypeId) {
        this.matchTypeId = matchTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
