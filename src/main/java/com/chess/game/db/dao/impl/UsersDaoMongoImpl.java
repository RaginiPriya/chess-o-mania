package com.chess.game.db.dao.impl;

import org.bson.Document;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.query.BasicUpdate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.User;
import com.mongodb.BasicDBObject;

public class UsersDaoMongoImpl implements UsersDaoMongo {
	
	private MongoTemplate mongoTemplate;
	
	private static final String COLLECTION_NAME = "users";
	
	private static final String EMAIL = "email";
	
	private static final String ID = "id";
	
	public UsersDaoMongoImpl(MongoTemplate mongoTemplate) {
		this.mongoTemplate = mongoTemplate;
		mongoTemplate.indexOps(COLLECTION_NAME).ensureIndex(new Index().unique().on(EMAIL, Direction.ASC));
	}

	@Override
	public User getUserByEmail(String email) {
		Criteria crtieria = Criteria.where(EMAIL).is(email);
		Query query = new Query(crtieria);
		return mongoTemplate.findOne(query, User.class, COLLECTION_NAME);
	}

	@Override
	public void saveUser(User user) {
		String email = user.getEmail();
		Criteria criteria = Criteria.where(EMAIL).is(email);
		Query query = new Query(criteria);
		BasicDBObject dbDoc = new BasicDBObject();
		mongoTemplate.getConverter().write(user, dbDoc);
		dbDoc.remove("_id");
		Document doc = new Document(dbDoc.toMap());
		Update update = new BasicUpdate(doc);
		mongoTemplate.upsert(query, update, COLLECTION_NAME);		
	}

	@Override
	public User getUserById(String id) {
		Criteria crtieria = Criteria.where(ID).is(id);
		Query query = new Query(crtieria);
		return mongoTemplate.findOne(query, User.class, COLLECTION_NAME);
	}

}
