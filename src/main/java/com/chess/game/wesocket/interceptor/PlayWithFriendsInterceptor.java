package com.chess.game.wesocket.interceptor;

import java.time.Instant;
import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.nimbusds.oauth2.sdk.util.StringUtils;

public class PlayWithFriendsInterceptor implements HandshakeInterceptor {
	
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		
        String path = request.getURI().getPath();
        if(StringUtils.isNotBlank(path) && path.contains("create")) {
        	String gameId = String.valueOf(Instant.now().getEpochSecond());
        	attributes.put("gameId", gameId);
            String userId = path.substring(path.lastIndexOf('/') + 1);
            attributes.put("userId", userId);
        }
        else if(StringUtils.isNotBlank(path) && path.contains("join")) {
        	String[] paths = path.split("/");
			int pathsLength = paths.length;
			
			String gameId = paths[pathsLength -1];
			String userId = paths[pathsLength -2];
        	attributes.put("gameId", gameId);
            attributes.put("userId", userId);
        }
        
        return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		
	}

}
