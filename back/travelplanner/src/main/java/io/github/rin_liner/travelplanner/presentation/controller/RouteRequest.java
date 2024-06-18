package io.github.rin_liner.travelplanner.presentation.controller;

public class RouteRequest {
    private String routeName;
    private String userId;
    private String memberId;

    // Getters and Setters
    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
}