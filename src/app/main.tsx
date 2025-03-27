"use client";
import { useState, useEffect } from "react";
import { PbsEpisode } from "@/utils/interfaces";
import axios from "axios";
import { Unbounded } from "next/font/google";
import spotifyApi from "@/lib/spotify";
import Header from "@/components/Header";
import ShowSelect from "@/components/ShowSelect";
import SpotifySearch from "@/components/SpotifySearch";
import Browse from "@/components/table_display/Browse";
import Completed from "@/components/table_display/Completed";
import Searching from "@/components/table_display/Searching";
import PlaylistSaver from "@/components/PlaylistSaver";

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

// TODO Some kind of Alert Functionality

// TODO proper typing for sessionData
export const Main = ({ sessionData }: any) => {
  const [tableDisplayState, setTableDisplayState] = useState<string | null>(
    null
  );
  const [episodeCount, setEpisodeCount] = useState<number | undefined>(
    undefined
  );
  const [episodeList, setEpisodeList] = useState<PbsEpisode[] | null>(null);
  const [searchResults, setSearchResults] = useState<PbsEpisode[] | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  // TODO Is it better to use null or "" for initial string values?
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedShowDescription, setSelectedShowDescription] = useState("");
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);
  const [selectedShowName, setSelectedShowName] = useState("");
  const [searchPercentage, setSearchPercentage] = useState<number>(0);
  const [tokenExpires, setTokenExpires] = useState<number | null>(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  //   // When PBS Show is selected, fetch episodes from API, adjust length per episode count and save episodelist to state.
  useEffect(() => {
    setSearchResults(null);
    const fetchSongList = async () => {
      try {
        const { data } = await axios.post<PbsEpisode[]>("/api/pbs", {
          url: selectedShowURL,
        });
        setEpisodeList(data.slice(0, episodeCount));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An unexpected error occurred";
        }
      }
    };
    if (selectedShowURL && episodeCount) {
      fetchSongList();
    }
    setTableDisplayState("Browse");
  }, [selectedShowURL, episodeCount]);

  //   // Handle expired access token.
  //   // My attempts at using refresh token functionality haven't worked, it seems there is an issue with the library:
  //   // https://github.com/thelinmichael/spotify-web-api-node/issues/441
  //   // Automatic token refresh would be nice, but I dont think it's a critical issue given the purpose of the app.
  useEffect(() => {
    const interval = setInterval(() => {
      tokenExpires && console.log(tokenExpires - Date.now());
      if (tokenExpires && Date.now() >= tokenExpires) {
        console.log("Expired access token, logging out!");
        setLoggedIn(false);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Check Session Data prop, set state values.
  useEffect(() => {
    if (sessionData) {
      spotifyApi.setAccessToken(sessionData.token.access_token);
      setTokenExpires(Date.now() + 3600000);
      setLoggedIn(true);
      spotifyApi.getMe().then(
        function (data) {
          if (data.body.display_name) {
            setDisplayName(data.body.display_name);
          }
        },
        function (err) {
          console.error(err);
          console.log("Setting LoggedIn to False...");
          setLoggedIn(false);
        }
      );
    } else {
      setLoggedIn(false);
    }
  }, [sessionData]);

  // Adjust TableDisplay during and after Spotify Search
  useEffect(() => {
    if (searchPercentage) {
      if (searchPercentage > 0 && searchPercentage < 100) {
        setTableDisplayState("Searching");
      } else if (searchResults && searchPercentage === 100) {
        setTableDisplayState("Completed");
      }
    }
  }, [searchPercentage, searchResults]);

  //   // Callback Functions
  const handle_showSelect = (data: any) => {
    setEpisodeCount(data.episodeCount);
    setSelectedShowDescription(data.selectedShowDescription);
    setSelectedShowURL(data.selectedShowURL);
    setSelectedShowName(data.selectedShowName);
  };

  const handle_PlaylistName = (data: string) => {
    setPlaylistName(data);
  };

  const handle_SearchResultsCallback = (data: PbsEpisode[]) => {
    setSearchResults(data);
  };

  const handle_SearchPercentageCallback = (data: number) => {
    setSearchPercentage(data);
  };

  const handle_PlaylistSaverCallback = () => {
    console.log("Data recieved from Playlist Saver component...");
  };

  const handle_resetCallback = () => {
    setResetTrigger((prev) => !prev);
    setTableDisplayState(null);
    setEpisodeList(null);
    setSearchResults(null);
    setPlaylistName("");
    setSearchPercentage(0);
  };

  //   // Component Rendering
  const renderSpotifySearch = () => {
    if (loggedIn && episodeList && !searchResults) {
      return (
        <div>
          <SpotifySearch
            spotifyApi={spotifyApi}
            episodeList={episodeList}
            searchResultsCallback={handle_SearchResultsCallback}
            searchPercentageCallback={handle_SearchPercentageCallback}
          />
        </div>
      );
    }
  };

  const renderPlaylistSaver = () => {
    if (searchResults && searchPercentage === 100) {
      return (
        <div>
          <PlaylistSaver
            searchResults={searchResults}
            spotifyApi={spotifyApi}
            playlistSaverCallback={handle_PlaylistSaverCallback}
            resetCallback={handle_resetCallback}
            pbsShowName={selectedShowName}
          />
        </div>
      );
    }
  };

  const renderTable = () => {
    if (tableDisplayState === "Browse") {
      return (
        <Browse
          episodeList={episodeList}
          showName={selectedShowName}
          showDescription={selectedShowDescription}
        />
      );
    }
    if (tableDisplayState === "Searching") {
      return (
        <Searching
          episodeList={episodeList}
          searchPercentage={searchPercentage}
        />
      );
    }
    if (tableDisplayState === "Completed") {
      return <Completed searchResults={searchResults} />;
    }
  };

  return (
    <div className="bg-babyPink min-h-screen">
      <Header displayName={displayName} loggedIn={loggedIn} />
      <ShowSelect
        ShowSelectCallback={handle_showSelect}
        resetTrigger={resetTrigger}
      />
      {renderSpotifySearch()}
      {renderPlaylistSaver()}
      {renderTable()}
    </div>
  );
};

// GENERAL PURPOSE BUTTON
// <div className="flex justify-center my-2">
//   <button
//     className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black mx-6 py-2 px-4 rounded-full md:py-5 md:px-10"
//     onClick={() => resetTest()}
//   >
//     <div className={`${unbounded.className}`}>Reset</div>
//   </button>
// </div>
