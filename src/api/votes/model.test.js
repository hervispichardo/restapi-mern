import { Votes } from '.'

let votes

beforeEach(async () => {
  votes = await Votes.create({ user: 'test', username: 'test', email: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = votes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(votes.id)
    expect(view.user).toBe(votes.user)
    expect(view.username).toBe(votes.username)
    expect(view.email).toBe(votes.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = votes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(votes.id)
    expect(view.user).toBe(votes.user)
    expect(view.username).toBe(votes.username)
    expect(view.email).toBe(votes.email)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
