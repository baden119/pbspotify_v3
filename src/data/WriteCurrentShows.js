
/**  
 * Reads RawAPIData (objext found at https://airnet.org.au/rest/stations/3pbs/programs),checks most recent episode for broadcast this year (2025)
 * Sorts array alphabetically and saved to currentShows.json.
 * This file is then read by the ShowSelect component.
 **/

const axios = require('axios');
const fs = require("fs");

fs.readFile('RawAPIData.json', function(err, data) { 

    if (err) throw err; 
    let currentShows = []
    const shows = JSON.parse(data); 
    const promises = shows.map(async (show, index) => {
        try {
            if (show.programRestUrl !== "https://airnet.org.au/rest/stations/3pbs/programs/") {
            const obj = await axios.get(
                show.programRestUrl + '/episodes'
            );
            const lastItem = obj.data.pop();
            if (lastItem && new Date(lastItem.start).getFullYear() === 2025) {
                currentShows.push(show);
            }
            }
        } catch (error) {
            console.log("error with " + show.name);
        }
    });

    Promise.all(promises).then(() => {
        const sortedShows = currentShows.sort((a, b) =>a.name.localeCompare(b.name))
        const jsonData = JSON.stringify(sortedShows, null, 2);
        fs.writeFile("currentShows.json", jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log('Data written to file');
            }});
    });


}); 



