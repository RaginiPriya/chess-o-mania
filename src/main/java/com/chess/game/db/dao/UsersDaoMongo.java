package com.chess.game.db.dao;

import com.chess.game.model.User;

public interface UsersDaoMongo {
	
	public User getUserByEmail(String email);
	
	public User getUserById(String id);
	
	public void saveUser(User user);

}
