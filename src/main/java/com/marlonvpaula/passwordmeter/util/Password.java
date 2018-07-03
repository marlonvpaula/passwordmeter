package com.marlonvpaula.passwordmeter.util;

public class Password {
	
	private String password;
	
	private Integer percent;
	
	private String text;
	
	private String color;

	public Password() {
	}
	
	public Password(String pass) {
		this.password = pass;
	}
	
	public Password(String pass, Integer percent, String text, String color) {
		this.password = pass;
		this.percent = percent;
		this.text = text;
		this.color = color;
		
	}
	
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getPercent() {
		return percent;
	}

	public void setPercent(Integer percent) {
		this.percent = percent;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}
	
	
	
}
