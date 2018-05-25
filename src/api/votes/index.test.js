import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Votes } from '.'

const app = () => express(apiRoot, routes)

let votes

beforeEach(async () => {
  votes = await Votes.create({})
})

test('POST /votes 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, user: 'test', username: 'test', email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.user).toEqual('test')
  expect(body.username).toEqual('test')
  expect(body.email).toEqual('test')
})

test('POST /votes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /votes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /votes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${votes.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(votes.id)
})

test('GET /votes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /votes/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${votes.id}`)
    .send({ access_token: masterKey, user: 'test', username: 'test', email: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(votes.id)
  expect(body.user).toEqual('test')
  expect(body.username).toEqual('test')
  expect(body.email).toEqual('test')
})

test('PUT /votes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${votes.id}`)
  expect(status).toBe(401)
})

test('PUT /votes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, user: 'test', username: 'test', email: 'test' })
  expect(status).toBe(404)
})

test('DELETE /votes/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${votes.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /votes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${votes.id}`)
  expect(status).toBe(401)
})

test('DELETE /votes/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
