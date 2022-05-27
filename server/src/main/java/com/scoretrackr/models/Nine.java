package com.scoretrackr.models;

public class Nine {
    private int nineId;
    private String name;
    private Course course;

    public Nine(){}

    public Nine(int nineId, String name, Course course){
        this.nineId = nineId;
        this.name = name;
        this.course = course;
    }

    public int getNineId() {
        return nineId;
    }

    public void setNineId(int nineId) {
        this.nineId = nineId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
