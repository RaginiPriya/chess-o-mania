package com.chess.game.websocket.handler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.springframework.util.CollectionUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.Color;
import com.chess.game.model.Message;
import com.chess.game.model.PlayOnlineResponse;
import com.chess.game.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.util.StringUtils;

public class PlayWithFriendsHandler extends TextWebSocketHandler {

	private GameHandler gameHandler;
	
	public PlayWithFriendsHandler(GameHandler gameHandler) {
		this.gameHandler = gameHandler;
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
		gameHandler.handleMessage(session, message);
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		gameHandler.handleEstablishedConnection(session, false, null);
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		gameHandler.handleSessionClose(session);
	}
}
