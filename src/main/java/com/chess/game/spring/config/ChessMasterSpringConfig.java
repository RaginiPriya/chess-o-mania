package com.chess.game.spring.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;

import com.chess.game.security.WebSecuritySpringConfig;

@Configuration
@Order(value=1)
@Import({
	WebConfiguration.class,
	UserSpringConfig.class,
	WebSecuritySpringConfig.class,
	WebSocketSpringConfig.class
})
@EnableAutoConfiguration
public class ChessMasterSpringConfig {

}
