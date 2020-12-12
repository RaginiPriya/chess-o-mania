package com.chess.game.db.dao;

import com.chess.game.model.Game;

public interface GameDaoMongo {
	
	public void saveGame(Game game);
	
	public Game getOpponentSession(String playerId, String color);
	
	public void removePlayer(String playerId, String color, String gameId);
	
	public void deleteGame(String gameId);
	
	public Game getGame(String playerId, String color);

}
