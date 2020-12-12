package com.chess.game.spring.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.db.dao.impl.UsersDaoMongoImpl;
import com.chess.game.security.CustomOAuth2UserService;
import com.chess.game.security.HttpCookieOAuth2AuthorizationRequestRepository;
import com.chess.game.security.TokenProvider;
import com.chess.game.service.UserService;
import com.chess.game.service.impl.UserServiceImpl;
import com.chess.game.websocket.handler.GameHandler;
import com.chess.game.websocket.handler.PlayOnlineHandler;
import com.chess.game.websocket.handler.PlayWithFriendsHandler;
import com.chess.game.wesocket.interceptor.PlayOnlineInterceptor;
import com.chess.game.wesocket.interceptor.PlayWithFriendsInterceptor;
import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
@ComponentScan(basePackages = {"com.chess.game.rest"})
public class UserSpringConfig {
	
	@Autowired
    private Environment env;

	@Autowired MongoTemplate mongoTemplate;
	
	@Bean
	public GameHandler gameHandler() {
		return new GameHandler(usersDaoMongo(), objectMapper());
	}
	
	@Bean
	public ObjectMapper objectMapper() {
		return new ObjectMapper();
	}
	
	@Bean
	public PlayOnlineHandler playOnlineHandler() {
		return new PlayOnlineHandler(gameHandler());
	}
	
	@Bean
	public PlayWithFriendsHandler playWithFriendsHandler() {
		return new PlayWithFriendsHandler(gameHandler());
	}
	
	@Bean
	public PlayOnlineInterceptor playOnlineInterceptor() {
		return new PlayOnlineInterceptor();
	}
	
	@Bean
	public PlayWithFriendsInterceptor playWithFriendsInterceptor() {
		return new PlayWithFriendsInterceptor();
	}
	
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
    
    @Bean
    public UsersDaoMongo usersDaoMongo() {
    	return new UsersDaoMongoImpl(mongoTemplate);
    }
    
    @Bean
    public UserService userService() {
    	return new UserServiceImpl(usersDaoMongo());
    }
    
    @Bean
    public CustomOAuth2UserService customOAuth2UserService() {
    	return new CustomOAuth2UserService(usersDaoMongo());
    }

    @Bean
    public TokenProvider tokenProvider() {
    	return new TokenProvider(env);
    }
    
    @Bean
    public com.chess.game.security.TokenAuthenticationFilter TokenAuthenticationFilter() {
    	return new com.chess.game.security.TokenAuthenticationFilter(tokenProvider(), userService());
    }
    
    @Bean
    public com.chess.game.security.OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler(){
    	return new com.chess.game.security.OAuth2AuthenticationSuccessHandler(tokenProvider(), env, httpCookieOAuth2AuthorizationRequestRepository());
    }
    
    @Bean
    public com.chess.game.security.OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler(){
    	return new com.chess.game.security.OAuth2AuthenticationFailureHandler(httpCookieOAuth2AuthorizationRequestRepository());
    }
}
