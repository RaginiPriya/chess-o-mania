package com.chess.game.db.dao.impl;

import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.chess.game.db.dao.UserColorDaoMongo;
import com.chess.game.model.Game;
import com.chess.game.model.UserColor;

public class UserColorDaoMongoImpl implements UserColorDaoMongo {
	
	private static final String COLLECTION_NAME = "userColor";
	private static final String USER_ID = "userId";
	private MongoTemplate mongoTemplate;
	
	public UserColorDaoMongoImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
		mongoTemplate.indexOps(COLLECTION_NAME).ensureIndex(new Index(USER_ID, Direction.ASC).unique());
	}
	

	@Override
	public UserColor getUserColor(String userId) {
		Criteria crtieria = Criteria.where(USER_ID).is(userId);
		Query query = new Query(crtieria);
		return mongoTemplate.findOne(query, UserColor.class, COLLECTION_NAME);
	}

	@Override
	public void saveUserColor(UserColor userColor) {
		mongoTemplate.insert(userColor, COLLECTION_NAME);		
	}

	@Override
	public void removeUserColor(String userId) {
		Criteria crit = Criteria.where(USER_ID).is(userId);
        Query query = new Query(crit);
        mongoTemplate.remove(query, COLLECTION_NAME);		
	}

}
