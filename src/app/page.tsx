"use client";
import { useState } from "react";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";

export default function Home() {
  const [tableDisplayState, setTableDisplayState] = useState<string>("Browse");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const renderTable = () => {
    if (tableDisplayState === "Browse") {
      return <Browse />;
    }

    if (tableDisplayState === "Searching") {
      return <Searching />;
    }

    if (tableDisplayState === "Completed") {
      return <Completed />;
    }
  };

  const apiTestFetch = async () => {
    const res = await fetch("/api/club/");
    const clubMsg = await res.json();
    console.log(clubMsg);
  };

  const apiTestPost = async () => {
    const res = await fetch("/api/club/", {
      method: "POST",
    });
    const clubMsg = await res.json();
    console.log(clubMsg);
  };

  return (
    <div className="bg-babyPink min-h-screen">
      <Header loggedIn={loggedIn} />
      <ShowSelect loggedIn={loggedIn} />
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple  hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Browse")}
        >
          Browse
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Searching")}
        >
          Searching
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setTableDisplayState("Completed")}
        >
          Completed
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => setLoggedIn(!loggedIn)}
        >
          Toggle User
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => apiTestFetch()}
        >
          API Fetch
        </button>
        <button
          className="bg-navBarPurple hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => apiTestPost()}
        >
          API Post
        </button>
      </div>
      <div className="text-center text-xl">{tableDisplayState}</div>
      {renderTable()}
    </div>
  );
}
