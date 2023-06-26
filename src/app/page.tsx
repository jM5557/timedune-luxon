"use client"

import { useSession, signIn, signOut } from "next-auth/react";
import DateTimeForm from "@/components/DateTimeForm";

const Home: React.FC = () => {
  return (
    <div>
      <button
        type="button"
        onClick={()=>signIn()}
      >
        Login
      </button>
      <DateTimeForm />
    </div>
  );
};

export default Home;
