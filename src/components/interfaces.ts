export interface User {
    library: Array<Song>,
    playerRef: any,
    selectedSong?: Song,
    songsList?: Song[]
}

export interface Song {
    id: string
    name: string
    image: string
    url: string
    duration: number
    size: number
    mimeType: string
    albumId: string
    album: Album
}
export interface Album {
    id: string
    name: string
    image: string
    authorId: string
    author: Author
}
export interface Author {
    id: string
    name: string
    image: string
}
export interface SongRow {
    index: number,
    audio: Song,
    playerRef: any
}
export interface Progress {
    currentTime: number;
    duration: number;
}
export interface SongPlayer {
    progress: Progress,
    playerRef: any,
}

export interface AppMain {
    playerRef: any;
}