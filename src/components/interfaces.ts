export interface Song {
    id: number
    author: string
    authorImage: string
    albumName: string
    songName: string
    songImage: string
    songUrl: string
    songDuration: number
    songSize: number
    songMimeType: string
    cloudinaryId: string
}
export interface SongRow {
    index: number,
    audio: Song,
    selectedSong: Song,
    setSelectedSong: any,
    playerRef: any
}
export interface Progress {
    currentTime: number;
    duration: number;
}
export interface SongPlayer {
    audio: Song,
    progress: Progress,
    playerRef: any,
    setSelectedSong: any,
    audios: Song[]
}
export interface Album {
    author: string;
    authorImage: string;
    albumName: string;
}
export interface AppMain {
    audios: Song[];
    setAudios: any;
    selectedSong: Song;
    playerRef: any;
    setSelectedSong: any;
}