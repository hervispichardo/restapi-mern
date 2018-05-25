import { Teams } from '.'

let teams

beforeEach(async () => {
  teams = await Teams.create({ name: 'test', code: 'test', votes: 0 })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = teams.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teams.id)
    expect(view.name).toBe(teams.name)
    expect(view.code).toBe(teams.code)
    expect(view.votes).toBe(teams.votes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = teams.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(teams.id)
    expect(view.name).toBe(teams.name)
    expect(view.code).toBe(teams.code)
    expect(view.votes).toBe(teams.votes)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
