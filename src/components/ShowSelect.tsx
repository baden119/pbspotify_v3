"use client";
import { useState } from "react";
import Select from "react-select";
import Switch from "react-switch";
import CurrentShowList from "../data/CurrentShowList.json";

const ShowSelect = ({ loggedIn }: { loggedIn: boolean }) => {
  let selectOptions = CurrentShowList.map((show) => {
    return {
      label: show.name,
      value: show.id,
    };
  });

  // React Switch
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  const renderPlaylistNameForm = () => {
    if (loggedIn)
      return (
        <div className="flex items-center">
          <input
            className="shadow appearance-none border rounded w-1/2 my-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="playListName"
            type="text"
            placeholder="Playlist Name"
          ></input>
          <div className="ml-4 py-5 flex flex-col items-center">
            <Switch
              onChange={handleChange}
              checked={checked}
              className="react-switch"
            />
            <div className="text-xs">Custom Playlist Name</div>
          </div>
        </div>
      );
  };
  return (
    <div className="flex justify-between">
      <div className="hidden w-1/4 md:block"></div>
      <div className="grow my-3 mx-1">
        <Select
          maxMenuHeight={500}
          placeholder={"Select A Show"}
          isSearchable={false}
          options={selectOptions}
          instanceId={"ShowSelect"}
        />
        {renderPlaylistNameForm()}
      </div>
      <div className="hidden w-1/4 md:block"></div>
    </div>
  );
};
export default ShowSelect;
