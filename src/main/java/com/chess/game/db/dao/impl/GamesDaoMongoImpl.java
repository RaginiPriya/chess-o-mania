package com.chess.game.db.dao.impl;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import com.chess.game.db.dao.GameDaoMongo;
import com.chess.game.model.Game;

public class GamesDaoMongoImpl implements GameDaoMongo {
	
	private static final String COLLECTION_NAME = "games";
	private static final String WHITE_ID = "whiteId";
	private static final String BLACK_ID = "blackId";
	private static final String GAME_ID = "gameId";
	private static final String WHITE_SESSION = "whiteSession";
	private static final String BLACK_SESSION = "blackSession";
	
	private MongoTemplate mongoTemplate;
	
	public GamesDaoMongoImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
		mongoTemplate.indexOps(COLLECTION_NAME).ensureIndex(new Index(WHITE_ID, Direction.ASC).unique());
		mongoTemplate.indexOps(COLLECTION_NAME).ensureIndex(new Index(BLACK_ID, Direction.ASC).unique());
	}

	@Override
	public void saveGame(Game game) {
		mongoTemplate.insert(game, COLLECTION_NAME);
		
	}

	@Override
	public Game getOpponentSession(String playerId, String color) {
		Criteria crtieria = Criteria.where(getIdKey(color)).is(playerId);
		Query query = new Query(crtieria);
		query.fields().include(getOpponentSessionKey(color));
		return mongoTemplate.findOne(query, Game.class, COLLECTION_NAME);
	}

	@Override
	public void removePlayer(String playerId, String color, String gameId) {
		Query query = new Query();
		query.addCriteria(Criteria.where(GAME_ID).is(gameId));
		Update update = new Update();
		update.unset(getIdKey(color));
		update.unset(getSessionKey(color));
		mongoTemplate.updateFirst(query, update, Game.class);
		
	}

	@Override
	public void deleteGame(String gameId) {
		Criteria crit = Criteria.where(GAME_ID).is(gameId);
        Query query = new Query(crit);
        mongoTemplate.remove(query, COLLECTION_NAME);
		
	}

	@Override
	public Game getGame(String playerId, String color) {
		Criteria crtieria = Criteria.where(getIdKey(color)).is(playerId);
		Query query = new Query(crtieria);
		return mongoTemplate.findOne(query, Game.class, COLLECTION_NAME);
	}
	
	private String getIdKey(String color) {
		return "white".equals(color) ? WHITE_ID : BLACK_ID;
	}
	
	private String getSessionKey(String color) {
		return "white".equals(color) ? WHITE_SESSION : BLACK_SESSION;
	}
	
	private String getOpponentSessionKey(String color) {
		return "white".equals(color) ? BLACK_SESSION : WHITE_SESSION;
	}

}
