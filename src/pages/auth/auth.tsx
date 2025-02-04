import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useLoginStore } from "../../utils/store";
import { login, register } from "../../services/apiService";


function Auth({ type }: { type: "login" | "register" }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loggedIn = useLoginStore((state) => state.loggedIn);
  const navigator = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (type === "login") {
      login({ username, password }).then((res) => {
        if (res.isSuccess) {
          if(res.data?.token) {
              localStorage.setItem("token", res.data.token);
              loggedIn(res.data.user);
              localStorage.setItem("token", res.data.token);
          }
          navigator("/");
          toast.success("Loggin Success !");
        } else {
          toast.error(res.errorMessage);
        }
      }).catch(() => toast.error("Something went wrong"));
    };

    if(type === "register") {
      register({ username, password }).then((res) => {
        if (res.isSuccess) {
          if(res.data?.token) {
              localStorage.setItem("token", res.data.token);
              loggedIn(res.data.user);
              localStorage.setItem("token", res.data.token);
          }
          navigator("/");
          toast.success("Loggin Success !");
        } else {2
          
          toast.error(res.errorMessage);
        }
      }).catch(() => toast.error("Something went wrong"));
    };
    
  }

 
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-4xl font-bold  mb-4 text-center">Know Ur Algo</h2>
        <h2 className="text-2xl font-bold mb-4 text-center">
          {type === "login" ? "Login" : "Register"} </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            >
              Log In
            </button>
            {/* <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a> */}
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default Auth;
