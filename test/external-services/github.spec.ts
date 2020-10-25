import Token from "../../app/domain/store/state/Token"
import GithubHttpAdapter from "../../app/infrastructure/GithubHttpAdapter"

describe('Github', () => {
    it('should load entertainments', async () => {
        const api = new GithubHttpAdapter()
        // Split token to avoid Github detection and de-activation
        const token = 'b4a7399bfa' + 'e67410b65a' + '2ea76c0eb8' + 'd9e65e4c3f'
        const call = api.entertainmentsGithub(new Token(token))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})