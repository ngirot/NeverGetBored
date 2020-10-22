import Token from "../../app/domain/store/state/Token"
import FeedlyHttpAdapter from "../../app/infrastructure/FeedlyHttpAdapter"

describe('Spotify', () => {
    it('should load entertainments', async () => {
        const api = new FeedlyHttpAdapter()
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        const expiredToken = new Token("",
            "AzpUVCGw99kKHOJvrtsNYKpLtlONNJovfRQykQf56OU0J6GholIbXiWBfoeElgfAr1fyrX96yZ8Y-LKtsXryUzKhL8vMMyhI1tr59cUlBURywq_bpfauA7xmpYj-Qi5qrueWIQt6hidDOHq05eL-Ijb3jwF6mHFGxGV4LBAxcFb53fauBpG4xRUjKUmiYfvK-DkrsKNV3TTqoeP9pU39AYunTzB2k3n73AyU2Qc0aB7jz2KVmJA_of3R9HdFkQzt_vPo1A:boutroue",
            yesterday)

        const call = api.refreshToken(expiredToken)
            .then(refreshed => api.entertainmentsFeedly(refreshed.token))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})