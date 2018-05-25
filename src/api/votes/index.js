import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Votes, { schema } from './model'

const router = new Router()
const { user, username, email } = schema.tree

/**
 * @api {post} /votes Create votes
 * @apiName CreateVotes
 * @apiGroup Votes
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user Votes's user.
 * @apiParam username Votes's username.
 * @apiParam email Votes's email.
 * @apiSuccess {Object} votes Votes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Votes not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ user, username, email }),
  create)

/**
 * @api {get} /votes Retrieve votes
 * @apiName RetrieveVotes
 * @apiGroup Votes
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of votes.
 * @apiSuccess {Object[]} rows List of votes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /votes/:id Retrieve votes
 * @apiName RetrieveVotes
 * @apiGroup Votes
 * @apiSuccess {Object} votes Votes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Votes not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /votes/:id Update votes
 * @apiName UpdateVotes
 * @apiGroup Votes
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam user Votes's user.
 * @apiParam username Votes's username.
 * @apiParam email Votes's email.
 * @apiSuccess {Object} votes Votes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Votes not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ user, username, email }),
  update)

/**
 * @api {delete} /votes/:id Delete votes
 * @apiName DeleteVotes
 * @apiGroup Votes
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Votes not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
