"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import CurrentShows from "../data/currentShows.json";

interface ShowSelectCallbackParams {
  episodeCount: number;
  selectedShowURL: string | null;
  selectedShowName: string;
  selectedShowDescription: string;
}

interface ShowSelect_props {
  ShowSelectCallback: (data: ShowSelectCallbackParams) => void;
  resetTrigger: boolean;
}

const ShowSelect = ({ ShowSelectCallback, resetTrigger }: ShowSelect_props) => {
  const [episodeCount, setEpisodeCount] = useState(5);
  const [selectedShowName, setSelectedShowName] = useState("");
  const [selectedShowURL, setSelectedShowURL] = useState<string | null>(null);
  const [selectedShowDescription, setSelectedShowDescription] = useState("");
  const [selectedShowOption, setSelectedShowOption] = useState(null); // For resetting the show select dropdown
  const [selectedEpisodeOption, setSelectedEpisodeOption] = useState({
    value: 5,
    label: "5",
  }); // For resetting the episode count select dropdown

  useEffect(() => {
    // Reset state when resetTrigger changes
    setEpisodeCount(5);
    setSelectedShowName("");
    setSelectedShowURL(null);
    setSelectedShowDescription("");
    setSelectedShowOption(null); // Reset the show select to default
    setSelectedEpisodeOption({ value: 5, label: "5" }); // Reset the episode count select to default
  }, [resetTrigger]);

  useEffect(() => {
    ShowSelectCallback({
      episodeCount: episodeCount,
      selectedShowURL: selectedShowURL,
      selectedShowName: selectedShowName,
      selectedShowDescription: selectedShowDescription,
    });
  }, [selectedShowName, episodeCount]);

  let selectOptions = CurrentShows.map((show, index) => {
    return {
      label: show.name,
      value: index,
      url: show.programRestUrl,
      description: show.gridDescription,
    };
  });

  const episodCountOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  const handleShowSelect = (e: any) => {
    setSelectedShowName(e.label);
    setSelectedShowURL(e.url);
    setSelectedShowDescription(e.description);
    setSelectedShowOption(e); // Update the selected option
  };

  const handleEpisodeSelect = (e: any) => {
    setEpisodeCount(e.value);
    setSelectedEpisodeOption(e); // Update the selected option
  };

  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className="grow my-3 mx-1">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="ShowSelect"
        >
          PBS Show
        </label>
        <Select
          maxMenuHeight={500}
          placeholder={"Select A Show"}
          isSearchable={false}
          options={selectOptions}
          instanceId={"ShowSelect"}
          value={selectedShowOption} // Controlled value for reset
          onChange={handleShowSelect}
        />
      </div>
      <div className="shrink my-3 mx-1">
        <label
          className="block text-gray-700 text-sm font-bold"
          htmlFor="episodeCountSelect"
        >
          Episodes
        </label>
        <Select
          maxMenuHeight={500}
          defaultValue={episodCountOptions[episodeCount - 1]}
          isSearchable={false}
          options={episodCountOptions}
          instanceId={"episodeCountSelect"}
          value={selectedEpisodeOption} // Controlled value for reset
          onChange={handleEpisodeSelect}
        />
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default ShowSelect;
