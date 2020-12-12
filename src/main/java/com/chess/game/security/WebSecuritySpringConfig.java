package com.chess.game.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.chess.game.service.UserService;


@EnableWebSecurity
public class WebSecuritySpringConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired 
	private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
	
	@Autowired
	private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;
	
	@Autowired
	private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

	@Autowired
	private CustomOAuth2UserService customOAuth2UserService;
	
	@Autowired
	private TokenAuthenticationFilter tokenAuthenticationFilter;
	
//    @Override
//    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
//        authenticationManagerBuilder
//                .userDetailsService(userService)
//                .passwordEncoder(passwordEncoder);
//    }
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
//        .cors()
//            .and()
        .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
        .cors().and()
        .csrf()
            .disable()
        .formLogin()
            .disable()
        .httpBasic()
            .disable()
        .authorizeRequests()
            .antMatchers("/",
                "/error",
                "/favicon.ico",
                "/**/*.png",
                "/**/*.gif",
                "/**/*.svg",
                "/**/*.jpg",
                "/**/*.html",
                "/**/*.css",
                "/**/*.js")
                .permitAll()
            .antMatchers("/oauth2/**")
                .permitAll()
            .antMatchers("/online/*")
                .permitAll()
             .antMatchers("/create/*")
             	.permitAll()
             .antMatchers("/join/**")
             	.permitAll()
            .anyRequest()
                .authenticated()
            .and()
        .oauth2Login()
            .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
                .and()
            .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
            .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
            .successHandler(oAuth2AuthenticationSuccessHandler)
            .failureHandler(oAuth2AuthenticationFailureHandler);
		
		http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}

}
