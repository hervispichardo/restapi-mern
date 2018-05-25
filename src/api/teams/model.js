import mongoose, { Schema } from 'mongoose'

const teamsSchema = new Schema({
  name: {
    type: String
  },
  code: {
    type: String
  },
  votes: {
    type: Number
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

teamsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      code: this.code,
      votes: this.votes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Teams', teamsSchema)

export const schema = model.schema
export default model
