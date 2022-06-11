package com.scoretrackr.models;

public class MatchFormat {
    private String matchFormatId;
    private String name;

    public MatchFormat(){}

    public MatchFormat(String matchFormatId, String name){
        this.matchFormatId = matchFormatId;
        this.name = name;
    }

    public String getMatchFormatId() {
        return matchFormatId;
    }

    public void setMatchFormatId(String matchFormatId) {
        this.matchFormatId = matchFormatId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

