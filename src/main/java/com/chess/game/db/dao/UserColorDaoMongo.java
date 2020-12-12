package com.chess.game.db.dao;

import com.chess.game.model.UserColor;

public interface UserColorDaoMongo {

	public UserColor getUserColor(String userId);
	
	public void saveUserColor(UserColor userColor);
	
	public void removeUserColor(String userId);
}
