package com.scoretrackr.models;

public class Score {
    private String scoreId;
    private int score;
    private Round round;
    private User user;
    private Hole hole;

    public Score(){}

    public Score(String scoreId, int score, Round round, User user, Hole hole){
        this.scoreId = scoreId;
        this.score = score;
        this.round = round;
        this.user = user;
        this.hole = hole;
    }

    public String getScoreId() {
        return scoreId;
    }

    public void setScoreId(String scoreId) {
        this.scoreId = scoreId;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Round getRound() {
        return round;
    }

    public void setRound(Round round) {
        this.round = round;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Hole getHole() {
        return hole;
    }

    public void setHole(Hole hole) {
        this.hole = hole;
    }
}
