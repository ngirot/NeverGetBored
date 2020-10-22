import Token from "../../app/domain/store/state/Token"
import SpotifyHttpAdapter from "../../app/infrastructure/SpotifyHttpAdapter"

describe('Spotify', () => {
    it('should load entertainments', async () => {
        const api = new SpotifyHttpAdapter()
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        const expiredToken = new Token("",
            "AQB3dPhO9vaIJFJ9efAhzB3V-qHRfHuUBFudOrKVLEfGr6PWqT54Ejy92-XZ_OPUHjim8cGQuZZvJC9RAAvGRWqfheFgEfVkryt_F2gBMztFZrT7IMNQ8QcI24ZiXBOt4_0",
            yesterday)

        const call = api.refreshToken(expiredToken)
            .then(refreshed => api.entertainmentsSpotify(refreshed.token))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})