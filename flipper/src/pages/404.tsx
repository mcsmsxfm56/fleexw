import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="grid place-content-center h-screen">
      <div className="container mx-auto max-w-md text-center">
        <div className="flex justify-center">
          <Image
            src="/crying.jpg"
            alt="crying_over_404"
            width="128"
            height="128"
          />
        </div>
        <h1 className="text-4xl font-bold text-zinc-700 my-4">
          404 - Página no Encontrada
        </h1>
        <p className="text-zinc-400">
          No pudimos encontrar la página que buscas :(
        </p>
        {/*TODO: List similar pages here */}
        {/*TODO: Create Search bar component here */}
        <div className="border border-b-gray-50 my-4"></div>
        {/* Add navigation to important pages */}
        <div>
          <Link
            className="hover:underline hover:text-indigo-400 text-indigo-500"
            href="/"
          >
            Volver al Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
