// import DemoPlayList from "../../data/DemoEpisodeData.json";
// @ts-ignore
// import { Progress } from "react-sweet-progress";
// import "react-sweet-progress/lib/style.css";
import { DM_Sans } from "next/font/google";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";

interface Searching_props {
  episodeList: PbsEpisode[] | null;
  searchPercentage: number | null;
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

const cellStyle = "px-1 border border-purple-400 text-sm md:text-base md:p-1";

const renderRow = (song: PbsTrack, date: string) => {
  return (
    <tr key={song.id} className="even:bg-tableStripe">
      <td className={cellStyle + " text-center"}>{CreateDate(date)}</td>
      <td className={cellStyle}>
        {song.artist} / {song.title}
      </td>
    </tr>
  );
};

const Searching = ({ episodeList, searchPercentage }: Searching_props) => {
  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      {/* Set Font */}
      <div className={`${dm_sans.className} flex`}>
        {/* Table Section */}
        <div className="flex-1">
          <table className="w-full table-auto border-collapse border border-purple-400">
            <thead>
              <tr>
                <th className={cellStyle}>Date</th>
                <th className={cellStyle}>Song Info from PBS</th>
              </tr>
            </thead>
            <tbody>
              {episodeList?.map((episode) => {
                if (episode.trackList) {
                  return episode.trackList.map((song) => {
                    return renderRow(song, episode.date);
                  });
                }
              })}
            </tbody>
          </table>
        </div>
        {/* Searching Section */}
        <div className="flex-1 p-5 border border-purple-400">
          <div className="border-b border-purple-400 text-lg">
            Searching Spotify...
          </div>
          <div className="flex flex-col items-center">
            <div className="text-center text-xl">{searchPercentage}</div>
          </div>
        </div>
      </div>

      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};

export default Searching;
