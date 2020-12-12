package com.chess.game.model;

public class UserColor {

	private String userId;
	
	private Color color;
	
	public UserColor(String userId, Color color) {
		this.userId = userId;
		this.color = color;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}
	
	
}
