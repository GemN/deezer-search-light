
const mergeTracksData = (tracks, newTracks) => {
  const mergedData = {
    ...newTracks,
    data: [...tracks.data, ...newTracks.data],
  };
  mergedData.data = [...((new Map(mergedData.data.map(o => [o.id, o]))).values())];
  return mergedData;
};

export { mergeTracksData };
