package com.chess.game.websocket.handler;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.Color;
import com.chess.game.model.Message;
import com.chess.game.model.PlayOnlineResponse;
import com.chess.game.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PlayOnlineHandler extends TextWebSocketHandler {
	
	private static List<WebSocketSession> onlinePlayers = new ArrayList<>();
	
	private GameHandler gameHandler;
	
	public PlayOnlineHandler(GameHandler gameHandler) {
		this.gameHandler = gameHandler;
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {
		gameHandler.handleMessage(session, message);
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		if(CollectionUtils.isEmpty(onlinePlayers)) {
			onlinePlayers.add(session);
		}
		else {
			WebSocketSession opponentSession = onlinePlayers.remove(0);
			gameHandler.handleEstablishedConnection(session, true, opponentSession);
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		if(!onlinePlayers.remove(session)) {
			gameHandler.handleSessionClose(session);
		}
	}
}

