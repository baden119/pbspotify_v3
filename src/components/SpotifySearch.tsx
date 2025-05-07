"use client";
import { useState, useEffect } from "react";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";
import { modifyInputString } from "@/utils/StringModifiers";
import SpotifyWebApi from "spotify-web-api-node";
import { FaSpotify } from "react-icons/fa";
import { Unbounded } from "next/font/google";

interface SpotifySearch_props {
  spotifyApi: SpotifyWebApi;
  episodeList: PbsEpisode[] | null;
  searchResultsCallback: (data: PbsEpisode[]) => void;
  searchPercentageCallback: (data: number) => void;
}
const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

const SpotifySearch = ({
  spotifyApi,
  episodeList,
  searchResultsCallback,
  searchPercentageCallback,
}: SpotifySearch_props) => {
  const [searchPercentage, setSearchPercentage] = useState(0);
  const [searchResults, setSearchResults] = useState<PbsEpisode[]>([]);

  // Search Percentage Callback
  useEffect(() => {
    searchPercentageCallback(searchPercentage);
  }, [searchPercentage]);

  // SongList Callback
  useEffect(() => {
    if (searchPercentage === 100 && searchResults.length) {
      searchResultsCallback(searchResults);
    }
  }, [searchPercentage]);

  // Keeps track of serach progress, passes data back to main component via callback.
  const updateSearchPercentage = (percentageDone: number, total: number) => {
    const newCount = Math.round((percentageDone / total) * 100);
    setSearchPercentage(newCount);
  };
  const SpotifySearch = async () => {
    const trackList: PbsTrack[] = [];

    // Parsing trackList out of episodeList
    episodeList?.forEach((episode) => {
      episode.trackList?.forEach((track) => {
        trackList.push(track);
      });
    });

    // Throttled Search routine. Passes search requests to the Spotify API while avoiding 429 Errors.
    // Creates modified track objects with search results if successful.
    let trackListWithResponses: PbsTrack[] = [];
    const delayTime = 125;
    const searchPromises = trackList.map((track, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            const response = await spotifyApi.searchTracks(
              `track:${modifyInputString(
                track.title
              )} artist:${modifyInputString(track.artist)}`,
              {
                limit: 1,
              }
            );
            // response.body.tracks?.items[0] indicates a sucessful search, update track object.
            if (response.body.tracks?.items[0]) {
              trackListWithResponses.push({
                id: track.id,
                artist: track.artist,
                title: track.title,
                spotify_id: response.body.tracks?.items[0].id,
                spotify_artist: response.body.tracks?.items[0].artists[0].name,
                spotify_title: response.body.tracks?.items[0].name,
                excluded_by_user: false,
              });
              // Keep track of search progress with updateSearchPercentage function
              updateSearchPercentage(
                trackListWithResponses.length,
                trackList.length
              );
              // Unsuccessful search, pass track object back without alteration.
            } else {
              trackListWithResponses.push(track);
              updateSearchPercentage(
                trackListWithResponses.length,
                trackList.length
              );
            }
          } catch (error) {
            console.error(
              `Error searching for track: ${track.title} | artist:${track.artist} `
            );
          }
          resolve();
        }, index * delayTime);
      });
    });
    await Promise.all(searchPromises);

    // Integrating Responses back into episodeList.
    let episodeListWithResponses: PbsEpisode[] = [];

    episodeList?.forEach((episode) => {
      let episodeWithResponses: PbsEpisode = {
        date: episode.date,
        trackList: [],
      };
      episode.trackList?.forEach((track) => {
        trackListWithResponses.forEach((res_track) => {
          if (res_track.id === track.id) {
            if (res_track.spotify_id) {
              episodeWithResponses.trackList?.push(res_track);
            } else {
              episodeWithResponses.trackList?.push(track);
            }
          }
        });
      });
      if (
        episodeWithResponses.trackList &&
        episodeWithResponses.trackList.length > 0
      ) {
        episodeListWithResponses.push(episodeWithResponses);
      } else {
        episodeListWithResponses.push(episode);
      }
    });
    // Save new track list (with search results) into state, gets sent back to main component via callback.
    setSearchResults(episodeListWithResponses);
  };

  if (episodeList)
    return (
      <div className="flex justify-center my-2">
        <button
          className="bg-navBarPurple flex items-center hover:bg-altNavBarPurple text-black mx-1 py-2 px-4 rounded-full md:py-5 md:px-10"
          onClick={() => SpotifySearch()}
        >
          <div className="hidden md:block md:mr-1">{<FaSpotify />}</div>
          <div className={`${unbounded.className}`}>Spotify Search!</div>
        </button>
      </div>
    );
};

export default SpotifySearch;
