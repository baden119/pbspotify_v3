import DemoPlayList from "../../data/DemoEpisodeData.json";
// import { Dosis } from "next/font/google";
import { DM_Sans } from "next/font/google";

// const dosis = Dosis({
//   weight: "400",
//   subsets: ["latin"],
// });

const dm_sans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
});

const CreateDate = (date: string) => {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  }).format(new Date(date));
};
const cellStyle = "px-1 border border-purple-400 text-sm md:text-base md:p-1";

const Browse = () => {
  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className={`${dm_sans.className} grow`}>
        <table className="w-full table-auto border-collapse border border-purple-400">
          <thead>
            <tr>
              <th className={cellStyle}>Date</th>
              <th className={cellStyle}>Song Info from PBS</th>
            </tr>
          </thead>
          <tbody>
            {DemoPlayList.data.map((song) => {
              return (
                <tr key={song.id} className="even:bg-tableStripe">
                  <td className={cellStyle + " text-center"}>
                    {CreateDate(DemoPlayList.date)}
                  </td>
                  <td className={cellStyle}>
                    {song.artist} / {song.track}
                  </td>
                </tr>
              );
            })}
            {DemoPlayList.data.map((song) => {
              return (
                <tr key={song.id} className="even:bg-tableStripe">
                  <td className={cellStyle + " text-center"}>
                    {CreateDate(DemoPlayList.date)}
                  </td>
                  <td className={cellStyle}>
                    {song.artist} / {song.track}
                  </td>
                </tr>
              );
            })}
            {DemoPlayList.data.map((song) => {
              return (
                <tr key={song.id} className="even:bg-tableStripe">
                  <td className={cellStyle + " text-center"}>
                    {CreateDate(DemoPlayList.date)}
                  </td>
                  <td className={cellStyle}>
                    {song.artist} / {song.track}
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
