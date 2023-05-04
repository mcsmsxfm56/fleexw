import Link from "next/link";

interface Props {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}
const NavBar = ({ isExpanded, setIsExpanded }: Props) => {
  return (
    <nav className="navbar fixed bg-indigo-600 w-full h-[50px] z-50">
      <div className="flex-none">
        <button
          className="btn btn-square btn-sm btn-ghost md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-7 h-7 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 justify-center">
        <Link href="/home" className="btn btn-ghost normal-case text-xl">
          Eventos
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
