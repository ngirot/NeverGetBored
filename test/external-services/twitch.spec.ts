import Token from "../../app/domain/store/state/Token"
import TwitchHttpAdapter from "../../app/infrastructure/TwitchHttpAdapter"

describe('Twitch', () => {
    it('should load entertainments', async () => {
        const api = new TwitchHttpAdapter()
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        const expiredToken = new Token("", "8vqn5plddgsnth7sm27apgmo5ll8uf83q72doy0vrp5dt6a8oj", yesterday)

        const call = api.refreshToken(expiredToken)
            .then(refreshed => api.entertainmentsTwitch(refreshed.token))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})