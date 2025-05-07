// Modifys track and artist string data recieved from the PBS API, helps Spotify API search accuracy.
// TODO I had this idea of modifying the browse comonent in a similar way to the completed component by making the song info clickable but it would knid of preview the string manipulations before searching, it will be good for testing, and even you could do a thing where people can choose the manipulation method.
export const modifyInputString = (inputString: string) => {
  if (inputString) {
    inputString = inputString.substring(0, 15);
    inputString = inputString.split("[")[0];
    inputString = inputString.split("-")[0];
    inputString = inputString.split("(")[0];
    inputString = inputString.split("ft.")[0];
    inputString = inputString.split("feat.")[0];
    inputString = inputString.split("feat")[0];
    inputString = inputString.split("FT")[0];
    inputString = inputString.split("Ft.")[0];
    inputString = inputString.replace(/[^a-zA-Z\s,&]/g, "");
    // below is specific for RadioCity Show. Might mess up others...
    inputString = inputString.replace(/^\d+\.\s*/, "");
    inputString = inputString.replace(/\s*-\s*$/, "");
    return inputString;
  } else return;
};
