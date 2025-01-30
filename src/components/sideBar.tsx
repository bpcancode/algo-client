
interface Props {
    children?: React.ReactNode;
}

const Sidebar : React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-[#1e2227] h-full text-white left-0 h-full overflow-y-auto z-[999px] ">
        {/* Adjusted height and overflow */}
        <div className="p-4">
          {" "}
          {/* Added padding */}
          {/* Logo or Brand */}
          <div className="mb-6">
            {" "}
            {/* Added margin bottom */}
            <a href="#" className="font-bold text-xl">
              {/* You can replace this with an image tag for your logo */}
              Know Your Algo
            </a>
            <p className="text-sm text-gray-400">Visualize Your Algorithms</p>
            <hr />
          </div>
          {/* Navigation Links */}
          <nav>
            <a
              href="#"
              className="block py-2 px-4 hover:bg-[#282c34] rounded transition-colors"
            >
              Start Coding
            </a>
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
            <a href="#" className="font-bold text-xl">
              Q binary
            </a>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-[#2ea44f] hover:bg-[#2c974b] px-4 py-2 rounded transition-colors"
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:bg-[#444] px-4 py-2 rounded transition-colors"
                >
                  Log In
                </a>
              </li>
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
