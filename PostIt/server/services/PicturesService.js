import { dbContext } from "../db/DbContext"

class  PicturesService{
  async create(pictureData) {
    let picture = await dbContext.Picture.create(pictureData)
    return picture
  }

}

export const picturesService = new PicturesService()
