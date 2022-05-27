package com.scoretrackr.domain.result;

import java.util.ArrayList;

public class Result<T> {
    private ResultType status = ResultType.SUCCESS;
    private ArrayList<String> messages = new ArrayList<>();
    private T payload;

    public void addErrorMessage(String message) {
        messages.add(message);
    }

    public boolean isSuccess() {
        return messages.size() == 0;
    }

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }

    public ArrayList<String> getMessages() {
        return messages;
    }

    public ResultType getStatus() {
        return status;
    }

    public void addMessage(String message, ResultType status) {
        messages.add(message);
        this.status = status;
    }
}
