package com.chess.game.security;

import java.util.Map;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.chess.game.db.dao.UsersDaoMongo;
import com.chess.game.model.AuthProvider;
import com.chess.game.model.User;

public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	
	private UsersDaoMongo usersDaoMongo;
	
	public CustomOAuth2UserService(UsersDaoMongo usersDaoMongo) {
		this.usersDaoMongo = usersDaoMongo;
	}
	
	@Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
		return processOAuth2User(oAuth2UserRequest, oAuth2User);
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
		User user = getOAuth2User(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
		usersDaoMongo.saveUser(user);
		User userInDb = usersDaoMongo.getUserByEmail(user.getEmail());
		return new UserPrincipal(userInDb.getId(),
				userInDb.getEmail(),
				userInDb.getPassword(), oAuth2User.getAttributes());
	}

	private User getOAuth2User(String registrationId, Map<String, Object> attributes) {
		if(registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new User((String) attributes.get("name"), (String) attributes.get("email"), AuthProvider.google, (String) attributes.get("picture"));
        } else if (registrationId.equalsIgnoreCase(AuthProvider.facebook.toString())) {
        	return new User((String) attributes.get("name"), (String) attributes.get("email"), AuthProvider.facebook, getImageUrlForFacebook(attributes));
        } else if (registrationId.equalsIgnoreCase(AuthProvider.github.toString())) {
        	return new User((String) attributes.get("name"), (String) attributes.get("email"), AuthProvider.github, (String) attributes.get("avatar_url"));
        }
		return null;
	}

	private String getImageUrlForFacebook(Map<String, Object> attributes) {
		if (attributes.containsKey("picture")) {
			Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
			if (pictureObj.containsKey("data")) {
				Map<String, Object> dataObj = (Map<String, Object>) pictureObj.get("data");
				if (dataObj.containsKey("url")) {
					return (String) dataObj.get("url");
				}
			}
		}
		return null;
	}

}
