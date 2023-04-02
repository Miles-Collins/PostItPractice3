import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { albumsService } from "../services/AlbumsService";

export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router.get("", this.getAll).get("/:id", this.getOne).get("/:id/pictures", this.getPictures).use(Auth0Provider.getAuthorizedUserInfo).post("", this.create).put("/:id", this.edit).delete("/:id", this.delete)
  }

  // GET ALL
async getAll(req, res, next) {
  try {
    let albums = await albumsService.getAll()
    return res.send(albums)
  } catch (error) {
    next(error)
  }
}

  // GET ONE
async getOne(req, res, next) {
  try {
  let albumId = req.params.id
  let album = await albumsService.getOne(albumId)
    return res.send()
  } catch (error) {
    next(error)
  }
}

  // CREATE
    async create(req, res, next) {
    try {
      let albumData = req.body
      albumData.creatorId = req.userInfo.id
      let album = await albumsService.create(albumData)
      return res.send(album)
    } catch (error) {
      next(error)
    }
  }

  // EDIT
  async edit(req, res, next) {
    try {
      let albumData = req.body
      albumData.creatorId = req.userInfo.id
      albumData.id = req.params.id
      let updatedAlbum = await albumsService.edit(albumData)
      return res.send(updatedAlbum)
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  async delete(req, res, next) {
    try {
      let albumId = req.params.id
      let userId = req.userInfo.id
      let string = await albumsService.delete(albumId, userId)
      return res.send(string)
    } catch (error) {
      next(error)
    }
  }

  // SECTION PICTURES

  // GET ALL
  async getPictures(req, res, next) {
    try {

      return res.send()
    } catch (error) {
      next(error)
    }
  }
}
