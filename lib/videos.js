import videoData from "../data/video.json";

export const getCommonVideos = async (url) => {
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API;

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `https://${BASE_URL}/${url}&maxResults=25&key=${API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      return (
        <>
          {console.log(data.error)}
          <h1>Youtube API error {data.error}</h1>
        </>
      );
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: id,
      };
    });
  } catch (error) {
    console.error("Something went Wrong with video Library", error);
    return (
      <>
        <h1>Something went Wrong with Video Library</h1>
      </>
    );
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};
