import Token from "../../app/domain/store/state/Token"
import GithubHttpAdapter from "../../app/infrastructure/GithubHttpAdapter"

describe('Github', () => {
    it('should load entertainments', async () => {
        const api = new GithubHttpAdapter()
        const call = api.entertainmentsGithub(new Token("df838a2e1d4e7c2bc9334154d2f8f6dccc364c2b"))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})