import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center gap-5 border-b-3 p-2 mb-3">
      <Link
        to="/"
        className="text-sky-600 hover:underline text-3xl no-underline"
      >
        Home
      </Link>
      <Link
        to="/recipe-list"
        className="text-sky-600 hover:underline text-3xl no-underline"
      >
        Recipe List
      </Link>
    </nav>
  );
};

export default Navbar;
