import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { AlbumsSchema } from "../models/Album";
import { PictureSchema } from "../models/Picture";

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Album = mongoose.model("Album", AlbumsSchema)
  Picture = mongoose.model("Picture", PictureSchema)
}

export const dbContext = new DbContext()
