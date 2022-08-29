export interface Song {
    id: string
    name: string
    image: string
    url: string
    duration: number
    size: number
    mimeType: string
    albumId: string
    album?: Album
}
export interface Album {
    id: string
    name: string
    image: string
    authorId: string
    author?: Author
}
export interface Author {
    id: string
    name: string
    image: string
}
export interface SongRow {
    index: number,
    album?: Album,
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

export interface AppMain {
    audios: Song[];
    setAudios: any;
    selectedSong: Song;
    playerRef: any;
    setSelectedSong: any;
}