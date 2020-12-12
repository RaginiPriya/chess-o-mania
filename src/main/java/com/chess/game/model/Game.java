package com.chess.game.model;

import org.springframework.web.socket.WebSocketSession;

public class Game {
	
	private String gameId;
	
	private String whiteId;
	
	private String blackId;
	
	private WebSocketSession whiteSession;
	
	private WebSocketSession blackSession;
	
	public Game(String gameId, String whiteId, WebSocketSession whiteSession, String blackId, WebSocketSession blackSession) {
		this.gameId = gameId;
		this.whiteId = whiteId;
		this.blackId = blackId;
		this.whiteSession = whiteSession;
		this.blackSession = blackSession;
	}

	public String getGameId() {
		return gameId;
	}

	public void setGameId(String gameId) {
		this.gameId = gameId;
	}

	public String getWhiteId() {
		return whiteId;
	}

	public void setWhiteId(String whiteId) {
		this.whiteId = whiteId;
	}

	public String getBlackId() {
		return blackId;
	}

	public void setBlackId(String blackId) {
		this.blackId = blackId;
	}

	public WebSocketSession getWhiteSession() {
		return whiteSession;
	}

	public void setWhiteSession(WebSocketSession whiteSession) {
		this.whiteSession = whiteSession;
	}

	public WebSocketSession getBlackSession() {
		return blackSession;
	}

	public void setBlackSession(WebSocketSession blackSession) {
		this.blackSession = blackSession;
	}
	
	

}
