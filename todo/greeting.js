const form = document.querySelector('.js-form'),	//form tag class name
	input = form.querySelector('input'), //input tag
		greeting = document.querySelector('.js-greetings'); //greeting text (hide)

		const USER_LS = "currentUser",				//localStorage name
			SHOWING_CN = "showing";					//index.css showing class(Opposition hide)

			function saveName(text){
				localStorage.setItem(USER_LS,text);
				}

				function handleSubmit(event){
					event.preventDefault();
						const currentValues = input.value;
							paintGreeting(currentValues)
							}

							function askForName(){						
								form.classList.add(SHOWING_CN);			//To form tag add showing class(When currentUser is null)
									form.addEventListener("submit",handleSubmit);
									}

									function paintGreeting(text) {				//showing greeting text
										form.classList.remove(SHOWING_CN);		//remove input class
											greeting.classList.add(SHOWING_CN)		//add greeting class
												greeting.innerHTML = `Hello ${text}`	//showing text
													saveName(text)
													}

													function loadName(){
														const currentUser = localStorage.getItem(USER_LS);
															if(currentUser === null) {
																	askForName();
																		} else {
																				paintGreeting(currentUser);
																					}
																					}

																					function init(){
																						loadName();
																						}
																						init();

