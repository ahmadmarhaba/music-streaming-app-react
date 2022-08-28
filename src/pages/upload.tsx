import { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [selectedAudio, setSelectedAudio] = useState();
  const [audios, setAudios] = useState<any>([]);

  const [author, setAuthor] = useState<any>("Neffex");
  const [authorImage, setAuthorImage] = useState<any>("https://i.pinimg.com/564x/0e/29/b4/0e29b408518bdb4696e109efb8d08f82.jpg");
  const [albumName, setAlbumName] = useState<any>("New Beginnings");
  // for image
  const [songName, setSongName] = useState<any>("I Wanna Play A Game feat. Jez Dior");
  const [songImage, setSongImage] = useState<any>("https://i.ytimg.com/vi/6jBhSCM64gI/maxresdefault.jpg");

  const handleChange = (event: any) => {
    setSelectedAudio(event.target.files[0]);
  }

  const handleAudioUpload = () => {
    if (!selectedAudio) { return; }
    const formData = new FormData();
    formData.append('song', selectedAudio);

    formData.append('author', author);
    formData.append('authorImage', authorImage);
    formData.append('albumName', albumName);
    formData.append('songName', songName);
    formData.append('songImage', songImage);

    axios.post("http://localhost:4000/api/upload", formData, {
      onUploadProgress: function (progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log(percentCompleted)
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response: any) => {
      if (response.status === 200)
        setAudios([...audios, response.data])
    }).catch(() => {
      console.log('Oooops, something went wrong!')
    })
  }
  const displayAudios = () =>
    audios.map((audio: any) =>
      <audio key={audio.cloudinaryId} controls src={audio.songUrl} typeof="audio/mpeg" />
    )
  return (
    <>
      <h1>{`Upload Audio`}</h1>
      <input onChange={handleChange} accept=".mp3" type="file" />

      <input onChange={(e) => { setAuthor(e.target.value) }} value={author} type="text" />
      <input onChange={(e) => { setAuthorImage(e.target.value) }} value={authorImage} type="text" />
      <input onChange={(e) => { setAlbumName(e.target.value) }} value={albumName} type="text" />

      <input onChange={(e) => { setSongName(e.target.value) }} value={songName} type="text" />
      <input onChange={(e) => { setSongImage(e.target.value) }} value={songImage} type="text" />

      <div>
        <button
          onClick={handleAudioUpload}
          disabled={!selectedAudio}
          className="">
          Submit
        </button>
      </div>
      <div className="">
        {audios ? displayAudios() : 'There are no audios :('}
      </div>
    </>
  )
}

export default Upload;