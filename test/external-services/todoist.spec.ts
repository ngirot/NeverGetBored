import Token from "../../app/domain/store/state/Token"
import TodoistHttpAdapter from "../../app/infrastructure/TodoistHttpAdapter"

describe('Todoist', () => {
    it('should load entertainments', async () => {
        const api = new TodoistHttpAdapter()
        const call = api.entertainmentsTodoist(new Token("f3d118f705cc4b098f3da2505a40be22db499e28"))
            .then(e => expect(e.length).toBeGreaterThan(0))
            .catch(error => fail("Impossible to fetch Todoist data: " + error))

        await call
    })
})