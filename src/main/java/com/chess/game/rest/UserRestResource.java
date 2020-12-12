package com.chess.game.rest;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.User;
import com.chess.game.security.UserPrincipal;
import com.chess.game.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserRestResource {
	
	@Autowired
	private UsersDaoMongo usersDaoMongo;
	
	@GetMapping()
	public User getUserByEmail() {
		UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		User user = usersDaoMongo.getUserById(userPrincipal.getId());
		return user;
	}

}
