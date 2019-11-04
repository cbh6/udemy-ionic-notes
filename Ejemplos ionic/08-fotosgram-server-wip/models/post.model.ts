import { Schema, Document, model } from 'mongoose';
import { Usuario } from './usuario.model';

const postSchema = new Schema({
  created: {
    type: Date
  },
  mensaje: {
    type: String
  },
  img: [
    {
      type: String
    }
  ],
  coords: {
    type: String
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: [true, 'Debe de existir una referencia a usuario']
  }
});

postSchema.pre<IPost>('save', function(next) {
  this.created = new Date();
  next();
});

interface IPost extends Document {
  created: Date;
  mensaje: string;
  img: string[];
  coords: string;
  usuario: string;
}

export const Post = model<IPost>('Post', postSchema);
