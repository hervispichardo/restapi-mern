import { Router } from 'express'
import { middleware as query, Schema } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy, increase } from './controller'
import { schema } from './model'
export Teams, { schema } from './model'

const router = new Router()
const { name, code, votes } = schema.tree

const orderByVotes = new Schema({
  sort: '-votes', // shorthand to { type: String, default: '-createdAt' }
});

/**
 * @api {post} /teams Create teams
 * @apiName CreateTeams
 * @apiGroup Teams
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Teams's name.
 * @apiParam code Teams's code.
 * @apiParam votes Teams's votes.
 * @apiSuccess {Object} teams Teams's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teams not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, code, votes }),
  create)

/**
 * @api {get} /teams Retrieve teams
 * @apiName RetrieveTeams
 * @apiGroup Teams
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of teams.
 * @apiSuccess {Object[]} rows List of teams.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(orderByVotes),
  index)

/**
 * @api {get} /teams/:id Retrieve teams
 * @apiName RetrieveTeams
 * @apiGroup Teams
 * @apiSuccess {Object} teams Teams's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teams not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /teams/:id Update teams
 * @apiName UpdateTeams
 * @apiGroup Teams
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Teams's name.
 * @apiParam code Teams's code.
 * @apiParam votes Teams's votes.
 * @apiSuccess {Object} teams Teams's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teams not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, code, votes }),
  update)

/**
 * @api {put} /teams/increase/:id Update votes teams
 * @apiName UpdateVotesTeams
 * @apiGroup Teams
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam id Teams's id.
 * @apiSuccess {Object} teams Teams's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teams not found.
 * @apiError 401 master access only.
 */
router.post('/increase/:id',
master(),
increase)


/**
 * @api {delete} /teams/:id Delete teams
 * @apiName DeleteTeams
 * @apiGroup Teams
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Teams not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
