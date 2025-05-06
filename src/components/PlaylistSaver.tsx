import { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { Unbounded } from "next/font/google";
import { PbsEpisode } from "@/utils/interfaces";
import SpotifyWebApi from "spotify-web-api-node";

interface PlaylistSaver_props {
  // TODO Typing for callback function
  searchResults: PbsEpisode[] | null;
  spotifyApi: SpotifyWebApi;
  pbsShowName: string | null;
  playlistSaverCallback: any;
  resetCallback: any;
}

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

const PlaylistSaver = ({
  searchResults,
  spotifyApi,
  pbsShowName,
  playlistSaverCallback,
  resetCallback,
}: PlaylistSaver_props) => {
  const [playlistName, setPlaylistName] = useState("");

  // AutoGenerate playlist name when new show is selected by user (via prop data)
  useEffect(() => {
    const generatePlaylistName = () => {
      const todaysDate = () => {
        return new Intl.DateTimeFormat("en-AU", {
          month: "long",
          year: "numeric",
        }).format(new Date());
      };
      return "[PBS] " + pbsShowName + " | " + todaysDate();
    };

    if (pbsShowName) {
      setPlaylistName(generatePlaylistName());
    }
  }, [pbsShowName]);

  const savePlaylist = async () => {
    const spotifyIDs: string[] = [];
    // Spotify has a limit on how many songs can be added to a playlist with one request.
    const API_limit = 99;

    // Parse Spotify IDs out of searchResults array
    searchResults?.forEach((episode) => {
      episode.trackList?.forEach((track) => {
        if (track.spotify_id && !track.excluded_by_user) {
          spotifyIDs.push(`spotify:track:${track.spotify_id}`);
        }
      });
    });

    const adjusted_arrays = spotifyIDs.reduce<string[][]>(
      (adjusted, item, index) => {
        const limitIndex = Math.floor(index / API_limit);

        // Initialize the subarray if it doesn't exist
        if (!adjusted[limitIndex]) {
          adjusted[limitIndex] = [];
        }

        // Add the current item to the appropriate subarray
        adjusted[limitIndex].push(item);

        return adjusted;
      },
      []
    );

    // Use Spotify IDs to create a playlist.
    try {
      const createResponse = await spotifyApi.createPlaylist(playlistName, {
        description: "Created By Pbspotify",
        public: true,
      });
      const newPlaylistID = createResponse.body.id;

      adjusted_arrays.map(async (array) => {
        try {
          await spotifyApi.addTracksToPlaylist(newPlaylistID, array);
          playlistSaverCallback();
        } catch (err) {
          console.error(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    resetCallback();
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="hidden w-1/4 md:block"></div>
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="playlistNameForm"
          >
            Playlist Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playlistNameForm"
            type="text"
            placeholder="Playlist Name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          ></input>
        </div>
        <div className="hidden w-1/4 md:block"></div>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => savePlaylist()}
        >
          <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
          <div className={`${unbounded.className}`}>Save Playlist</div>
        </button>
        <button
          className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black mx-6 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => reset()}
        >
          <div className={`${unbounded.className}`}>Reset</div>
        </button>
      </div>
    </div>
  );
};

export default PlaylistSaver;
