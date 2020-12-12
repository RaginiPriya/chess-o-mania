package com.chess.game.spring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.chess.game.websocket.handler.PlayOnlineHandler;
import com.chess.game.websocket.handler.PlayWithFriendsHandler;
import com.chess.game.wesocket.interceptor.PlayOnlineInterceptor;
import com.chess.game.wesocket.interceptor.PlayWithFriendsInterceptor;

@Configuration
@EnableWebSocket
public class WebSocketSpringConfig implements WebSocketConfigurer {
	
	@Autowired 
	private PlayOnlineHandler playOnlineHandler;
	
	@Autowired
	private PlayOnlineInterceptor playOnlineInterceptor;
	
	@Autowired
	private PlayWithFriendsInterceptor playWithFriendsInterceptor;
	
	@Autowired
	private PlayWithFriendsHandler playWithFriendsHandler;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(playOnlineHandler, "/online/*")
        .addInterceptors(playOnlineInterceptor)
        .setAllowedOrigins("*");
		
		registry.addHandler(playWithFriendsHandler, "/create/*", "/join/**")
		.addInterceptors(playWithFriendsInterceptor)
		.setAllowedOrigins("*");
		
//		registry.addHandler(playOnlineHandler, "/join/**")
////		.addInterceptors(playOnlineInterceptor)
//		.setAllowedOrigins("*");
	}
	
	

}
