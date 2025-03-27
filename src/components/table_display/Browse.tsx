import { DM_Sans } from "next/font/google";
import { Unbounded } from "next/font/google";
import { PbsEpisode, PbsTrack } from "@/utils/interfaces";

interface Browse_props {
  episodeList: PbsEpisode[] | null;
  showName: string | null;
  showDescription: string;
}

const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  preload: true,
});

const unbounded = Unbounded({
  weight: "300",
  subsets: ["latin"],
  preload: true,
});

// TODO Loading Spinner for PBS Data
// TODO Create Date, font data etc are repeated, export to single file.

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

const Browse = ({ episodeList, showName, showDescription }: Browse_props) => {
  if (episodeList)
    return (
      <div className="flex justify-between">
        <div className="hidden w-1/4 md:block"></div>
        <div className={`${dm_sans.className} grow`}>
          <p className={`${unbounded.className} text-xl text-center mb-3`}>
            {showDescription}
          </p>
          <table className="w-full table-auto border-collapse border border-purple-400">
            <thead>
              <tr>
                <th className={cellStyle}>Date</th>
                <th className={cellStyle}>Song Info from PBS</th>
              </tr>
            </thead>
            <tbody>
              {episodeList.map((episode) => {
                if (episode.trackList) {
                  return episode.trackList.map((song) => {
                    return renderRow(song, episode.date);
                  });
                }
                return (
                  <tr key={episode.date} className="even:bg-tableStripe">
                    <td className={cellStyle + " text-center"}>
                      {CreateDate(episode.date)}
                    </td>
                    <td className={cellStyle}>
                      ** No Tracklist For This Weeks Show. **
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="hidden w-1/4 md:block"></div>
      </div>
    );
};
export default Browse;
