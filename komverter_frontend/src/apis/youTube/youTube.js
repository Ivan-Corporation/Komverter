import axiosInstance from './axiosInstance';

export const getVideos = (keyword, pageToken = '', maxResults = 20) => {
  return axiosInstance.get(
    `/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&q=${keyword}&type=video&pageToken=${pageToken}`
  );
};

export const getRelatedVideos = (videoId, pageToken = '', maxResults = 20) => {
  return axiosInstance.get(
    `/search?part=snippet&videoEmbeddable=true&maxResults=${maxResults}&relatedToVideoId=${videoId}&type=video&pageToken=${pageToken}`
  );
};

export const getVideoDetails = (videoId) => {
  return axiosInstance.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`);
};


