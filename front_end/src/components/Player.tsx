type parVal = {
  url: string;
};

function Player({ url }: parVal) {
  const videoLink = `https:www.youtube.com/embed/${url}?modestbtranding=1&autoplay=1`;

  console.log("playing", videoLink);

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoLink}
        title="YouTube Video Player"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Player;
