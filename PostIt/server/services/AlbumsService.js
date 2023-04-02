import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class AlbumsService {

  // DELETE
  async delete(albumId, userId) {
    let album = await this.getOne(albumId)
  if(album.creatorId != userId) {
    throw new Forbidden(`You do not have permission to delete Album: ${album.title}.`)
  }
  await album.remove()
  return `Album: ${album.title} has been successfully deleted!`
  }

  // EDIT
  async edit(albumData) {
    let updatedAlbum = await this.getOne(albumData.id)
    if(albumData.creatorId != updatedAlbum.creatorId) {
      throw new Forbidden(`You do not have permission to edit Album: ${updatedAlbum.title}.`)
    }
    updatedAlbum.title = albumData.title || updatedAlbum.title
    updatedAlbum.category = albumData.category || updatedAlbum.category
    updatedAlbum.coverImg = albumData.coverImg || updatedAlbum.coverImg
    await updatedAlbum.save();
    return updatedAlbum
  }

  // GET ONE
  async getOne(albumId) {
    let album = await dbContext.Album.findById(albumId).populate("creator", 'name, picture')
    if(album == null) {
      throw new BadRequest('There is no album with that ID.')
    }
    return album
  }

  // GET ALL
    async getAll() {
    let albums = await dbContext.Album.find().populate("creator", 'name, picture')
    return albums
  }

  // CREATE
  async create(albumData) {
    let album = await dbContext.Album.create(albumData.id)
    await album.populate("creator", 'name, picture')
    return album
  }

}

export const albumsService = new AlbumsService()
