import { store } from "./store.js";

export function setupCharts(chartsHolder) {
  store.subscribe("YTData", (YTData) => {
    const totalWatchedVideos = YTData.length;
    const channelsSet = new Set();
    const videosMap = {};
    YTData.forEach((item) => {
      if (item?.subtitles?.length > 0 && item.subtitles[0].name) {
        channelsSet.add(item.subtitles[0].name);
      }
      if (
        item.title &&
        !item.title.includes("Watched a video that has been removed")
      ) {
        videosMap[item.title] = videosMap[item.title] || {
          count: 0,
          url: item.titleUrl,
          title: item.title,
        };
        videosMap[item.title].count++;
      }
    });
    const mostWatchedVideo = Object.values(videosMap).sort(
      (a, b) => b.count - a.count
    )[0];
    const mostWatchedVideoTitle = mostWatchedVideo.title;
    const mostWatchedVideoUrl = mostWatchedVideo.url;
    const mostWatchedVideoCount = mostWatchedVideo.count;

    const basicStats = document.querySelector("#basic-stats");
    basicStats.classList.remove("hidden");
    document.querySelector("#total-watched").innerText = totalWatchedVideos;
    document.querySelector("#total-channels").innerText = channelsSet.size;
    document.querySelector("#most-watched-video").innerHTML = `<a
    class="text-blue-100 hover:text-blue-200"
    href="${mostWatchedVideoUrl}"
    target="_blank"
    >${mostWatchedVideoTitle}</a
  >`;
    document.querySelector("#most-watched-video-count").innerText =
      mostWatchedVideoCount;
  });
}
