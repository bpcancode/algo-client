import { Link } from "react-router";
import { useLoginStore } from "../utils/store";

interface Props {
  children?: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const loggedOut = useLoginStore((state) => state.loggedOut);
  const user = useLoginStore((state) => state.user);

  function handleLoggout() {
    loggedOut();
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-[#1e2227] text-white left-0 h-full overflow-y-auto z-[999px] ">
        <div className="p-4">
          {" "}
          <div className="mb-6">
            {" "}
            <a href="#" className="font-bold text-xl">
              Know Your Algo
            </a>
            <p className="text-sm text-gray-400">Visualize Your Algorithms</p>
            <hr />
          </div>
          <nav>
            <Link
              to="editor"
              className="block py-2 px-4 hover:bg-[#282c34] rounded transition-colors"
            >
              Start Coding
            </Link>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-[#282c34] rounded transition-colors"
            >
              Your Work
            </a>
          </nav>
        </div>
      </aside>

      <div className="h-full bg-gray-100 w-full">
        <nav className="bg-[#24292e] text-white py-4 w-full z-100">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <a href="#" className="font-bold text-xl"></a>
            <ul className="flex space-x-6 items-center">
              {isLoggedIn ? (
                <>
                    <li>
                      <p>Welcome {user?.username}</p>
                    </li>

                    <li>
                      <button
                        onClick={handleLoggout}
                        className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                      >
                        Log Out
                      </button>
                    </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="bg-[#2ea44f] hover:bg-[#2c974b] px-4 py-2 rounded transition-colors"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                    >
                      Log In
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <div className="p-3 w-full h-[94.3%] overflow-scroll hide-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
