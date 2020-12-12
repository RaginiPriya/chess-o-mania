package com.chess.game.model;

public class Message {
	
	private String type;
	
	private String gameId;
	
	private String myColor;
	
	private Boolean isCastling;
	
	private Square fromSquare;
	
	private Square toSquare;
	
	private int index;
	
	public Message() {}
	
	public Message(String type) {
		this.type = type;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}

	public String getMyColor() {
		return myColor;
	}

	public void setMyColor(String myColor) {
		this.myColor = myColor;
	}

	public Boolean getIsCastling() {
		return isCastling;
	}

	public void setIsCastling(Boolean isCastling) {
		this.isCastling = isCastling;
	}

	public Square getFromSquare() {
		return fromSquare;
	}

	public void setFromSquare(Square fromSquare) {
		this.fromSquare = fromSquare;
	}

	public Square getToSquare() {
		return toSquare;
	}

	public void setToSquare(Square toSquare) {
		this.toSquare = toSquare;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

}
