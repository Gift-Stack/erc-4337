import { Inter } from "next/font/google";

import { Login } from "@/components/login";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col py-24 ${inter.className}`}>
      <div className="w-full h-[70svh] flex flex-col py-0 px-6 text-white">
        <Login />
      </div>
    </main>
  );
}
