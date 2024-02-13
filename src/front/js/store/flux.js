const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			API_URL: process.env.BACKEND_URL,
			token: null,
			message: null,
			favorites: [],
			seeLater: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			movies: [],
			comments: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			signup: async (email, password, user_name) => {
				const store = getStore()
				const infoNewUser = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password,
						"user_name": user_name

					})
				};
				try {
					const resp = await fetch (store.API_URL + '/api/user', infoNewUser)
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error during signup:", errorData);
						alert("There has been some error");
						return false;
					}
				} catch (error) {
					console.error("Fatal error during signup:", error);
				}
				
			},
			login: async (email, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try {
					const resp = await fetch (store.API_URL + '/api/token', opts);
					if (resp.status !== 200) {
						const errorData = await resp.json();
						console.error("Error during login:", errorData);
						alert("There has been some error");
						return false;
					}
					const data = await resp.json();
					console.log("Token from the backend:", data.access_token);
					localStorage.setItem("token", data.access_token);
					setStore ({token: data.access_token});
					return true;
				} catch (error) {
					console.error("Fatal error during login:", error);
				}
				
			},
			setToken: (token) => {
				setStore({token: token});
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("login out");
				setStore({token: null})
			},
			setMovies: (data) => {
				setStore({ movies: data});
			},
			addComment: async (movieId, text) => {
				const store = getStore();

				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify({
						"text": text
					})
				};

				try {
					const resp = await fetch(`${store.API_URL}/api/movies/${movieId}/comments`, opts);
					
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error adding comment:", errorData);

						alert("There has been some error");
						return false;
					}

					// Actualizar los comentarios después de agregar uno nuevo
					getActions().getComments(movieId);

					return true;
				} catch (error) {
					console.error("Fatal error adding comment:", error);
					return false;
				}
			},
			getComments: async (movieId) => {
				const store = getStore();
			  
				const opts = {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",

				  },
				};
			  
				try {
				  const resp = await fetch(`${store.API_URL}/api/movies/${movieId}/comments`, opts);
			  
				  if (resp.status !== 200) {
					const errorData = await resp.json();
					console.error("Error getting comments:", errorData);
					alert("There has been some error");
					return false;
				  }
			  
				  const data = await resp.json();
				  console.log(data)
			  
				  // Actualizar los comentarios en el estado global
				  setStore({ comments: data });
				  console.log(store.comments);
				  return true;
				} catch (error) {
					console.error("Fatal error getting comments:", error);
					// Puedes agregar un alert o manejar el error de otra manera
					alert("Error getting comments. Please try again.");
					return false;
				}
			},
			addFavorite: async (movieId) => {
				const store = getStore();

				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify("")
				};

				try {
					const resp = await fetch(`${store.API_URL}/api/movies/${movieId}/favorites`, opts);
					
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error adding favorites:", errorData);

						alert("There has been some error");
						return false;
					}

					//
					getActions().getFavorites()


					return true;
				} catch (error) {
					console.error("Fatal error adding comment:", error);
					return false;
				}
			},
			getFavorites: async () => {
				const store = getStore();
			  console.log (store.token);
				const opts = {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				  },
				};
			  
				try {
				  const resp = await fetch(`${store.API_URL}/api/user/favorites`, opts);
			  
				  if (resp.status !== 200) {
					const errorData = await resp.json();
					console.error("Error getting favorites:", errorData);
					alert("There has been some error");
					return false;
				  }
			  
				  const data = await resp.json();
				  console.log(data)
			  
				  // Actualizar los comentarios en el estado global
				  setStore({ favorites: data ["favorites"] });
				  console.log(store.favorites);
				  return true;
				} catch (error) {
					console.error("Fatal error getting comments:", error);
					// Puedes agregar un alert o manejar el error de otra manera
					alert("Error getting comments. Please try again.");
					return false;
				}
			},
			deleteFavorite: async (favorite_id) => {
				const store = getStore();
				console.log ("me ejecuto")
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify("")
				};

				try {
					const resp = await fetch(`${store.API_URL}/api/user/favorites/${favorite_id}`, opts);
					
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error deleting favorite:", errorData);

						alert("There has been some error");
						return false;
					}
				 getActions().getFavorites()

				}catch (error) {
					console.error("Fatal error getting seelater", error);
					// Puedes agregar un alert o manejar el error de otra manera
					alert("Error getting seelater. Please try again.");
					return false;
				}
			},	
			addSeelater: async (movieId) => {
				const store = getStore();
				console.log ("me ejecuto")
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify("")
				};

				try {
					const resp = await fetch(`${store.API_URL}/api/movies/${movieId}/seelaters`, opts);
					
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error adding seelater:", errorData);

						alert("There has been some error");
						return false;
					}

					//
					getActions().getSeelaters()


					return true;
				} catch (error) {
					console.error("Fatal error adding seelater:", error);
					return false;
				}

			},

			getSeelaters: async () => {
				const store = getStore();
			  console.log (store.token);
				const opts = {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${store.token}`
				  },
				};
			  
				try {
				  const resp = await fetch(`${store.API_URL}/api/user/seelaters`, opts);
			  
				  if (resp.status !== 200) {
					const errorData = await resp.json();
					console.error("Error getting seelaters:", errorData);
					alert("There has been some error");
					return false;
				  }
			  
				  const data = await resp.json();
				  console.log(data)
			  
				  // Actualizar los comentarios en el estado global
				  setStore({ seelaters: data ["seelaters"] });
				  console.log(store.seelaters);
				  return true;
				} catch (error) {
					console.error("Fatal error getting seelater", error);
					// Puedes agregar un alert o manejar el error de otra manera
					alert("Error getting seelater. Please try again.");
					return false;
				}
			},
			deleteSeelater: async (seelater_id) => {
				const store = getStore();
				console.log ("me ejecuto")
				const opts = {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${store.token}`
					},
					body: JSON.stringify("")
				};

				try {
					const resp = await fetch(`${store.API_URL}/api/user/seelaters/${seelater_id}`, opts);
					
					if (resp.status !== 201) {
						const errorData = await resp.json();
						console.error("Error deleting seelater:", errorData);

						alert("There has been some error");
						return false;
					}
				 getActions().getSeelaters()

				}catch (error) {
					console.error("Fatal error getting seelater", error);
					// Puedes agregar un alert o manejar el error de otra manera
					alert("Error getting seelater. Please try again.");
					return false;
				}
			},	
			
		},
	}
};

export default getState;
