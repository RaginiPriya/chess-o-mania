package com.chess.game.model;

public class PlayOnlineResponse {
	
	private String gameId;
	
	private Color color;
	
	private String opponentName;
	
	private String opponentImageUrl;

	public PlayOnlineResponse(String gameId, Color color, String opponentName, String opponentImageUrl) {
		this.gameId = gameId;
		this.color = color;
		this.opponentName = opponentName;
		this.opponentImageUrl = opponentImageUrl;
	}
	
	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}

	public Color getColor() {
		return color;
	}

	public void setColor(Color color) {
		this.color = color;
	}

	public String getOpponentName() {
		return opponentName;
	}

	public void setOpponentName(String opponentName) {
		this.opponentName = opponentName;
	}

	public String getOpponentImageUrl() {
		return opponentImageUrl;
	}

	public void setOpponentImageUrl(String opponentImageUrl) {
		this.opponentImageUrl = opponentImageUrl;
	}
	
	
	
	

}
