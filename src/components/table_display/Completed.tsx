import { useState } from "react";
import { DM_Sans } from "next/font/google";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";

interface Completed_props {
  searchResults: PbsEpisode[] | null;
}

const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const CreateDate = (date: string) => {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  }).format(new Date(date));
};
const cellStyle = "px-1 border border-purple-400 md:text-base md:p-1";

const Completed = ({ searchResults }: Completed_props) => {
  const [songList, setSongList] = useState(searchResults);

  const excludeResult = (id: number) => {
    setSongList((prevSongList) => {
      if (!prevSongList) return null; // Return null if the list is null
      return prevSongList.map((episode) => ({
        ...episode,
        trackList: episode.trackList?.map((track) =>
          track.id === id
            ? { ...track, excluded_by_user: !track.excluded_by_user }
            : track
        ),
      }));
    });
  };

  const renderRow = (song: PbsTrack, date: string) => {
    const renderExclusion = (song: PbsTrack) => {
      if (song.excluded_by_user) {
        return (
          <div
            className={
              cellStyle + " table-cell cursor-pointer bg-red-500 relative"
            }
            onClick={() => excludeResult(song.id)}
          >
            {song.spotify_artist} / {song.spotify_title}
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl bg-black bg-opacity-10">
              Song Excluded
            </span>
          </div>
        );
      } else
        return (
          <div
            className={cellStyle + " table-cell cursor-pointer"}
            onClick={() => excludeResult(song.id)}
          >
            {song.spotify_artist} / {song.spotify_title}
          </div>
        );
    };

    if (song.spotify_id)
      // TODO Add track select/unselect functionality.
      return (
        // Removed <tbody> tags, keep an eye on it if theres an issue
        <div key={song.id} className="table-row even:bg-tableStripe">
          <div className={cellStyle + " table-cell text-center"}>
            {CreateDate(date)}
          </div>
          <div className={cellStyle + " table-cell"}>
            {song.artist} / {song.title}
          </div>

          {renderExclusion(song)}
        </div>
      );
    else
      return (
        // TODO Change to <div> tags to prevent HYDRATION ERROR!!!111!
        <tr key={song.id} className="even:bg-tableStripe">
          <td className={cellStyle + " text-center"}>{CreateDate(date)}</td>
          <td className={cellStyle}>
            {song.artist} / {song.title}
          </td>
          <td className={cellStyle}>No Match Found</td>
        </tr>
      );
  };

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className={`${dm_sans.className} grow`}>
        <div className="table w-full table-auto border-collapse border border-purple-400">
          <div className="table-header-group">
            <tr>
              <th className={cellStyle}>Date</th>
              <th className={cellStyle}>Song Info from PBS</th>
              <th className={cellStyle}>Spotify Search Result</th>
            </tr>
          </div>
          {songList?.map((episode) => {
            if (episode.trackList) {
              return episode.trackList.map((song) => {
                return renderRow(song, episode.date);
              });
            }
          })}
        </div>
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default Completed;

// return (
//   <tr key={song.id} className="even:bg-tableStripe">
//     <td className={cellStyle + " text-center"}>{CreateDate(date)}</td>
//     <td className={cellStyle}>
//       {song.artist} / {song.title}
//     </td>
//     <td className={cellStyle}>
//       {song.spotify_artist} / {song.spotify_title}
//     </td>
//   </tr>
// );
