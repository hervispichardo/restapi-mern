import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Teams } from '.'

const app = () => express(apiRoot, routes)

let teams

beforeEach(async () => {
  teams = await Teams.create({})
})

test('POST /teams 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, name: 'test', code: 'test', votes: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
  expect(body.votes).toEqual('test')
})

test('POST /teams 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teams 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /teams/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${teams.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teams.id)
})

test('GET /teams/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /teams/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${teams.id}`)
    .send({ access_token: masterKey, name: 'test', code: 'test', votes: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teams.id)
  expect(body.name).toEqual('test')
  expect(body.code).toEqual('test')
  expect(body.votes).toEqual('test')
})

test('PUT /teams/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${teams.id}`)
  expect(status).toBe(401)
})

test('PUT /teams/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, name: 'test', code: 'test', votes: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teams/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teams.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /teams/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teams.id}`)
  expect(status).toBe(401)
})

test('DELETE /teams/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
