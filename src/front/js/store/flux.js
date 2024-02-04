const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			API_URL: process.env.BACKEND_URL,
			token: null,
			message: null,
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
					sessionStorage.setItem("token", data.access_token);
					setStore ({token: data.access_token});
					return true;
				} catch (error) {
					console.error("Fatal error during login:", error);
				}
				
			},
			logout: () => {
				sessionStorage.removeItem("token");
				console.log("login out");
				setStore({token: null})
			},
			setMovies: (data) => {
				setStore({ movies: data});
			},
			  
		}
	};
};

export default getState;
