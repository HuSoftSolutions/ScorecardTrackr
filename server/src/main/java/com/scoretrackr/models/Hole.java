package com.scoretrackr.models;

public class Hole {
    private String holeId;
    private int number;
    private int handicap;
    private int par;
    private int yards;
    private Nine nine;

    public Hole(){}

    public Hole(String holeId, int number, int handicap, int par, int yards, Nine nine){
        this.holeId = holeId;
        this.number = number;
        this.handicap = handicap;
        this.par = par;
        this.yards = yards;
        this.nine = nine;
    }

    public String getHoleId() {
        return holeId;
    }

    public void setHoleId(String holeId) {
        this.holeId = holeId;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getHandicap() {
        return handicap;
    }

    public void setHandicap(int handicap) {
        this.handicap = handicap;
    }

    public int getPar() {
        return par;
    }

    public void setPar(int par) {
        this.par = par;
    }

    public int getYards() {
        return yards;
    }

    public void setYards(int yards) {
        this.yards = yards;
    }

    public Nine getNine() {
        return nine;
    }

    public void setNine(Nine nine) {
        this.nine = nine;
    }
}
