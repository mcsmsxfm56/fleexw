import NavBar from "@/components/NavBar";
import { useSesionUsuarioContext } from "@/hooks/useSesionUsuarioContext";


export default function Home() {

  return (
    <>
      <header className="bg-indigo-600 text-slate-100 flex justify-between">
        <NavBar />
      </header>

    </>
  );
}