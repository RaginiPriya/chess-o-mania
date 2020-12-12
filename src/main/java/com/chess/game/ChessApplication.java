package com.chess.game;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.chess.game.spring.config.ChessMasterSpringConfig;

public class ChessApplication {
	
	@Configuration
    public static class EmbeddedServletContainerSpringConfig
    {
		@Bean
	    public ServletWebServerFactory servletWebServerFactory() {
	        return new TomcatServletWebServerFactory();
	    }
    }

	public static void main(String[] args) {
		SpringApplication app = new SpringApplicationBuilder()
                .sources(
                        EmbeddedServletContainerSpringConfig.class,
                        ChessMasterSpringConfig.class
                        )
                .build();
		app.run(args);
	}

}
