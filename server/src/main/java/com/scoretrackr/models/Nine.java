package com.scoretrackr.models;

public class Nine {
    private String nineId;
    private String name;
    private Course course;

    public Nine(){}

    public Nine(String nineId, String name, Course course){
        this.nineId = nineId;
        this.name = name;
        this.course = course;
    }

    public String getNineId() {
        return nineId;
    }

    public void setNineId(String nineId) {
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
