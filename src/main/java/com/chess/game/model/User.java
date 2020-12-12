package com.chess.game.model;

import org.springframework.data.annotation.Id;

public class User {
	
	@Id
	private String id;
	
	private String name;
	
	private String email;
	
	private String password;
	
	private AuthProvider provider;
	
	private String imageUrl;
	
	public User(String name, String email, AuthProvider provider, String imageUrl) {
		this.name = name;
		this.email = email;
		this.provider = provider;
		this.imageUrl = imageUrl;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public AuthProvider getProvider() {
		return provider;
	}

	public void setProvider(AuthProvider provider) {
		this.provider = provider;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	
	public boolean compareEqual(User user) {
		if(user == null) {
			return false;
		}
		if(name.equals(user.getName()) 
				&& email.equals(user.getEmail()) 
				&& provider.toString().equals(user.getProvider().toString()) 
				&& imageUrl.equals(user.getImageUrl())) {
			return true;
		}
		return false;
	}

	
	
	
	

}
