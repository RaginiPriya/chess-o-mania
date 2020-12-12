package com.chess.game.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class UserPrincipal implements OAuth2User, UserDetails{
	
	private static final long serialVersionUID = 1L;
	private String id;
    private String email;
    private String password;
    private Map<String, Object> attributes;
    private Collection<? extends GrantedAuthority> authorities;
    
    public UserPrincipal(String id, String email, String password, Map<String, Object> attributes) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.attributes = attributes;
        this.authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }

	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getName() {
		return String.valueOf(id);
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

	public String getId() {
		return id;
	}

}
