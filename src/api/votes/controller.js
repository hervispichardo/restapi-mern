import { success, notFound } from '../../services/response/'
import { Votes } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Votes.create(body)
    .then((votes) => votes.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Votes.count(query)
    .then(count => Votes.find(query, select, cursor)
      .then((votes) => ({
        count,
        rows: votes.map((votes) => votes.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Votes.findById(params.id)
    .then(notFound(res))
    .then((votes) => votes ? votes.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Votes.findById(params.id)
    .then(notFound(res))
    .then((votes) => votes ? Object.assign(votes, body).save() : null)
    .then((votes) => votes ? votes.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Votes.findById(params.id)
    .then(notFound(res))
    .then((votes) => votes ? votes.remove() : null)
    .then(success(res, 204))
    .catch(next)
