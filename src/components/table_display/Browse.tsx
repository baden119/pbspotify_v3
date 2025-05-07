import { PbsEpisode, PbsTrack } from "@/utils/interfaces";
import {
  unbounded,
  dm_sans,
  cellStyle,
  CreateDate,
} from "@/utils/TableDisplayUtils";
import Spinner from "../Spinner";

interface Browse_props {
  episodeList: PbsEpisode[] | null;
  showName: string | null;
  showDescription: string;
  loading: boolean;
}

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

const Browse = ({
  episodeList,
  showName,
  showDescription,
  loading,
}: Browse_props) => {
  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="hidden w-1/4 md:block"></div>
        <div>
          <div className="flex justify-center">
            <Spinner />
          </div>
          <h1>Fetching Show Data from PBS...</h1>
        </div>
        <div className="hidden w-1/4 md:block"></div>
      </div>
    );
  }
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
