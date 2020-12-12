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
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.Color;
import com.chess.game.model.Message;
import com.chess.game.model.PlayOnlineResponse;
import com.chess.game.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class GameHandler {
	
	private static Map<String,List<String>> gameIdToUserId = new HashMap<>();
	private static Map<String,WebSocketSession> userIdToSession = new HashMap<>();
	private static Map<String,String> userIdToGameId = new HashMap<>();
	
	private UsersDaoMongo usersDaoMongo;
	private ObjectMapper objectMapper;
	
	public GameHandler(UsersDaoMongo usersDaoMongo, ObjectMapper objectMapper) {
		this.usersDaoMongo = usersDaoMongo;
		this.objectMapper = objectMapper;
	}
	
	public void handleMessage(WebSocketSession session, TextMessage message) throws IOException {
		Message chessMessage = objectMapper.readValue(message.getPayload(), Message.class);
		
		if(!StringUtils.isEmpty(chessMessage.getGameId())) {
			List<String> playerIds = gameIdToUserId.get(chessMessage.getGameId());
			String userId = (String) session.getAttributes().get("userId");
			if(!StringUtils.isEmpty(userId)) {
				String opponentId = playerIds.stream().filter(player -> !userId.equals(player)).findAny().orElse(null);
				if(!StringUtils.isEmpty(opponentId)) {
					WebSocketSession opponent = userIdToSession.get(opponentId);
					if(opponent != null) {
						opponent.sendMessage(message);
					}
				}
			}
		}
	}
	
	public void handleSessionClose(WebSocketSession session) throws IOException {
		
		String userId = (String) session.getAttributes().get("userId");
		userIdToSession.remove(userId);
		String gameId = userIdToGameId.remove(userId);
		if(!StringUtils.isEmpty(gameId)) {
			List<String> playerIds = gameIdToUserId.get(gameId);
			ListIterator<String> iterator = playerIds.listIterator();
			while (iterator.hasNext()) {
				String id = iterator.next();
				if(id.equals(userId)) {
					iterator.remove();
				}
				else {
					WebSocketSession opponent = userIdToSession.get(id);
					if(opponent != null) {
						String message = objectMapper.writeValueAsString(new Message("quit"));
						opponent.sendMessage(new TextMessage(message));
					}
				}
			}
			List<String> ids = gameIdToUserId.get(gameId);
			if(CollectionUtils.isEmpty(ids)) {
				gameIdToUserId.remove(gameId);
			}
		}
		session.close();
		
	}
	
	public void handleEstablishedConnection(WebSocketSession session, boolean isOnline, WebSocketSession opponentSession) throws IOException {
		if(isOnline) {			
			String gameId = String.valueOf(Instant.now().getEpochSecond());
			String userId = (String) session.getAttributes().get("userId");
			String opponentId = (String) opponentSession.getAttributes().get("userId");
			User opponentUser = usersDaoMongo.getUserById(opponentId);
			User user = usersDaoMongo.getUserById(userId);
			String responseString = objectMapper.writeValueAsString(new PlayOnlineResponse(gameId, Color.white, opponentUser.getName(), opponentUser.getImageUrl()));
			String opponentResponseString = objectMapper.writeValueAsString(new PlayOnlineResponse(gameId, Color.black, user.getName(), user.getImageUrl()));
			session.sendMessage(new TextMessage(responseString));
			opponentSession.sendMessage(new TextMessage(opponentResponseString));
			List<String> playerIds = new ArrayList<>();
			playerIds.add(userId);
			playerIds.add(opponentId);
			gameIdToUserId.put(gameId, playerIds);
			userIdToSession.put(userId, session);
			userIdToSession.put(opponentId, opponentSession);
			userIdToGameId.put(userId, gameId);
			userIdToGameId.put(opponentId, gameId);
		}
		else {
			String path = session.getUri().getPath();
			if(!StringUtils.isEmpty(path) && path.contains("create")) {
				String gameId = (String) session.getAttributes().get("gameId");
				if(!StringUtils.isEmpty(gameId)) {
			        String userId = path.substring(path.lastIndexOf('/') + 1);
			        addUserIdToMap(userId, gameId, session, true);
				}
			}
			else if(!StringUtils.isEmpty(path) && path.contains("join")) {
				String gameId = (String) session.getAttributes().get("gameId");
				String userId = (String) session.getAttributes().get("userId");
				
				if(gameIdToUserId.containsKey(gameId)) {
					List<String> userIds = gameIdToUserId.get(gameId);
					if(CollectionUtils.isEmpty(userIds)) {
						addUserIdToMap(userId, gameId, session, true);
					}
					else if(userIds.size() > 1) {
						sendInvalid(session);
					}
					else {
						addUserIdToMap(userId, gameId, session, false);
						String opponentId = userIds.get(0);
						opponentSession = userIdToSession.get(opponentId);
						
						User opponentUser = usersDaoMongo.getUserById(opponentId);
						PlayOnlineResponse response = new PlayOnlineResponse(gameId, Color.black, opponentUser.getName(), opponentUser.getImageUrl());
						String responseString = objectMapper.writeValueAsString(response);
						session.sendMessage(new TextMessage(responseString));
						
						User user = usersDaoMongo.getUserById(userId);
						PlayOnlineResponse opponentResponse = new PlayOnlineResponse(gameId, Color.white, user.getName(), user.getImageUrl());
						String opponentResponseString = objectMapper.writeValueAsString(opponentResponse);
						opponentSession.sendMessage(new TextMessage(opponentResponseString));
					}
				}
				else {
					sendInvalid(session);
				}
			}
		}
	}
	
	private void addUserIdToMap(String userId, String gameId, WebSocketSession session, boolean sendMessage) throws IOException {
		List<String> userIds = gameIdToUserId.get(gameId);
		if(CollectionUtils.isEmpty(userIds)) {
			userIds = new ArrayList<>();
		}
        userIds.add(userId);
        gameIdToUserId.put(gameId, userIds);
        userIdToSession.put(userId, session);
        userIdToGameId.put(userId, gameId);
        if(sendMessage) {
        	Message message = new Message("gameId");
            message.setGameId(gameId);
    		String messageString = objectMapper.writeValueAsString(message);
    		session.sendMessage(new TextMessage(messageString));
        }
	}
	
	private void sendInvalid(WebSocketSession session) throws IOException {
		Message message = new Message("invalid");
		String messageString = objectMapper.writeValueAsString(message);
		session.sendMessage(new TextMessage(messageString));		
	}


}
