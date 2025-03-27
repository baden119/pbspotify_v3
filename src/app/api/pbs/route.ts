import { NextResponse } from 'next/server';
import { PbsTrack, PbsEpisode } from '@/utils/interfaces';
import axios from "axios";

interface PbsApiEpisodeResponse {
start: string,
episodeRestUrl:	string
}

// Fetches broadcast dates and track listing URLs for 10 latest episodes of a PBS Show
const fetchTenEpisodes = async (url: string): Promise<PbsEpisode[] | string>  => {
  let episodeList: PbsEpisode[] = []
  try {
    const { data, status } = await axios.get(
      url + '/episodes?numAfter=10&numBefore=10'
    );

    data.forEach((episode:PbsApiEpisodeResponse) => {
      const currentEpisode:PbsEpisode = {
        trackListURL: episode.episodeRestUrl,
        date: episode.start.split(" ")[0]
      }
      episodeList = [...episodeList, currentEpisode];
    });

    // Sort episodes by date (newest first)
    episodeList.sort((a: PbsEpisode, b: PbsEpisode): number => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return episodeList;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
       return "An unexpected error occurred";
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }

}

// Takes in an array of endpoints on the PBS API, fetches and formats this data into an array of tracklists representing individual PBS episodes.
const fetchEpisodeTrackLists = async (episodeList: PbsEpisode[]) :  Promise<PbsEpisode[] | string> => {
  let idCount = 0
  try {
    // map each episode URL to a promise
    const fetchPromises = episodeList.map(episode => 
      axios.get(episode.trackListURL + '/playlists')
    )

     // Await all promises to resolve
    const responses = await Promise.all(fetchPromises)

    // Extract and return the data from each response
    const rawAPIData = responses.map(response => response.data)

    // Parse out and return relevant data from API responses, short tracklists are marked as null.
    return(rawAPIData.map((trackList, index) => {

      // Mark short tracklists as null
      if (Object.keys(trackList).length < 3){
        return {
          date: episodeList[index].date,
          trackList: null
        }
      }
      // Parse out Artist and Title information from API response
      const parsedTrackList = trackList.map((trackData: PbsTrack) => {
          idCount += 1
          // TODO Alter variable names (pbs_id or something)
          return {
            id: idCount,
            artist: trackData.artist,
            title: trackData.title
          }
        })
        return {
          date: episodeList[index].date,
          trackList : parsedTrackList
        }
    })
)
  } catch (error) {
    console.error("An error occurred while fetching episode data:", error);
    throw new Error("Failed to fetch episode data.");
  }
}

  export async function POST(request: Request) {
    // Get URL for selected PBS show from request body
    const urlData = await request.json()

    if (urlData.url === null) return NextResponse.json({ message: 'No PBS Show URL provided'});

    // Fetch brodcast date and track listing URLs for 10 recent episodes selected show from PBS API
    const episodeList = await fetchTenEpisodes(urlData.url)

    // TODO: Error Handling here needs improvement
    if (typeof(episodeList)==='string'){
      const errorMessage: string = episodeList
      return NextResponse.json({ message: errorMessage});
    }

    // Fetch tracklists from PBS API
    const episodesWithTrackLists = await fetchEpisodeTrackLists(episodeList);

    return NextResponse.json(episodesWithTrackLists);
  }
