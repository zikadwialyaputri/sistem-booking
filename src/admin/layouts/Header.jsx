import { FaSearch } from "react-icons/fa";

export default function Header() {
  return (
    <nav
      id="header-container"
      className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
    >
      <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        {/* Search Bar & Profile Section */}
        <div className="flex flex-row flex-wrap items-center lg:ml-auto mr-3">
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <FaSearch />
              </span>
              <input
                id="search-input"
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form>

          {/* Profile Section */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div
              id="profile-container"
              className="flex items-center space-x-3 text-white"
            >
              <span id="profile-text" className="text-sm hidden lg:block">
                Hello, <span className="font-bold">Anggota kelompok 5</span>
              </span>
              <div className="items-center flex">
                <span className="w-12 h-12 text-sm text-white bg-gray-200 inline-flex items-center justify-center rounded-full">
                  <img
                    id="profile-avatar"
                    alt="..."
                    className="w-full rounded-full align-middle border-none shadow-lg"
                    src="/img/pp.jpg"
                  />
                </span>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
