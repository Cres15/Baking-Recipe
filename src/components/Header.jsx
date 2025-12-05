import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#D48BE3] shadow-md py-4">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6">

        <h1 className="text-2xl md:text-4xl font-bold text-[#0f0f0f]">
          Baking Recipe
        </h1>

        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-lg mid:text-2xl font-bold border-2 md:border-4 border-black px-3 md:px-4 py-1 rounded-xl hover:bg-black hover:text-white transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/process"
              className="text-lg mid:text-2xl font-bold border-2 md:border-4 border-black px-3 md:px-4 py-1 rounded-xl hover:bg-black hover:text-white transition"
            >
              Process
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}

export default Header;
