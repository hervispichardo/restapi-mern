import mongoose, { Schema } from 'mongoose'

const votesSchema = new Schema({
  user: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

votesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Votes', votesSchema)

export const schema = model.schema
export default model
