import Link from "next/link";

const Navigation = () => {
  return (
    <div className="relative mx-auto">
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center w-full h-16 bg-blue-500 z-50">
        <div className="flex w-full lg:w-1/3 mx-4 lg:mx-0 justify-between">
          <Link href={"/"}>
            <h1 className="text-white text-xl font-bold flex-grow-1">
              Poke Monster!
            </h1>
          </Link>
          <div className="flex space-x-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button onClick={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
