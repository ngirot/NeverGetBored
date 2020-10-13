import HttpApi from "../http/HttpApi"
import VideoSearchResult from "./VideoSearchResult"
import {Duration} from "moment"
import moment = require("moment")

export default class YouTubeApi {

    private readonly apiKey: string = "AIzaSyCeOwbJ8dvgZA3kssojXFCEcY8q5O4Oxjw"
    private readonly apiBaseUrl: string = "https://www.googleapis.com/youtube/v3/"

    public getDurations = (urls: string[]): Promise<[string, Duration][]> => {
        const videoIds = urls.map(url => [url, this.extractYoutubeId(url)])
            .filter(pair => pair[1] !== undefined)

        const idParameter = videoIds.map(pair => pair[1]).join(',')

        return new HttpApi(this.apiBaseUrl)
            .get("videos?id=" + idParameter + "&part=contentDetails&key=" + this.apiKey)
            .then((data: VideoSearchResult) => {
                return data.items.map(item => {
                    const url = (videoIds.find(id => id[1] === item.id)) as [string, string]
                    const duration = moment.duration(item.contentDetails.duration)
                    return [url[0], duration]
                })
            })
    }

    private extractYoutubeId = (url: string): string | undefined => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/

        if (!regExp.test(url)) {
            return undefined
        }

        const match = url.match(regExp)
        return (match && match[7].length == 11) ? match[7] : undefined
    }
}