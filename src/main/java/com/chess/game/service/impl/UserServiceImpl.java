package com.chess.game.service.impl;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.security.UserPrincipal;
import com.chess.game.service.UserService;

public class UserServiceImpl implements UserService {
	
	private UsersDaoMongo usersDaoMongo;
	
	public UserServiceImpl(UsersDaoMongo usersDaoMongo) {
		this.usersDaoMongo = usersDaoMongo;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.chess.game.model.User user = usersDaoMongo.getUserByEmail(username);
		if(user == null) {
			throw new UsernameNotFoundException(username);
		}
		return new UserPrincipal(user.getId(), username, user.getPassword(), null);
	}

	@Override
	public UserDetails loadUserById(String id) {
		com.chess.game.model.User user = usersDaoMongo.getUserById(id);
		if(user == null) {
			throw new UsernameNotFoundException(String.valueOf(id));
		}
		return new UserPrincipal(user.getId(), user.getEmail(), user.getPassword(), null);
	}

}
