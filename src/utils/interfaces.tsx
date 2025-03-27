export interface PbsTrack {
  id: number;
  artist: string;
  title: string;
  spotify_artist?: string;
  spotify_title?: string;
  spotify_id?: string;
  excluded_by_user: boolean;
}

export interface PbsEpisode {
  trackListURL?: string;
  trackList?: PbsTrack[] | null;
  date: string;
}
