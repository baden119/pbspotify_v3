import { useState } from "react";
import DemoPlayList from "../../data/DemoEpisodeData.json";
// @ts-ignore
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { DM_Sans } from "next/font/google";

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

const Searching = () => {
  const [completed, setCompleted] = useState(50);

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
        {/* Searching Section */}
        <div className="flex-1 p-5 border border-purple-400">
          <div className="border-b border-purple-400 text-lg">
            Searching Spotify...
          </div>
          <div className="flex flex-col items-center">
            <div className="grow mt-10">
              <Progress
                theme={{
                  error: {
                    trailColor: "pink",
                    color: "red",
                  },
                  default: {
                    trailColor: "lightblue",
                    color: "blue",
                  },
                  active: {
                    trailColor: "yellow",
                    color: "orange",
                  },
                  success: {
                    trailColor: "lime",
                    color: "green",
                  },
                }}
                strokeWidth={5}
                width={150}
                type="circle"
                percent={50}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};

export default Searching;
