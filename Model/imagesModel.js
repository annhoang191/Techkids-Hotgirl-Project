const mongoose  = require ('mongoose');
const Schema    = mongoose.Schema;
const ObjectId  = Schema.ObjectId;

const imagesSchema = new Schema({
  imageUrl: {
    type : String,
    required : true
    //TODO validate https://
  },
  posterId : {
    type : ObjectId,
    ref  : 'users'
  },
  view : {
    type : Number,
    default : 0
  },
  likes : {
    type : [{
      type : ObjectId
    }]
  },
  content : {
    type : String
  },
  title : {
    type : String
  },
  tag : {
    type : [{
      type : String
    }]
  }
}, {timestamps: {createAt: 'created_at'}} ,{ collection : 'images'})

const imagesModel = mongoose.model('images', imagesSchema);

//define 4 basic functions CREATE - READ - UPDATE - DELETE

//CREATE : create new image
const CreateImage = (newImage, callback) => {
  imagesModel.create(newImage, (err,image) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null,image);
    }
  })
}
//READ : Get image by Id
const GetImage = (id, callback) => {
  imagesModel.findOne({ _id : id }).populate('posterId').exec((err, image) =>{
    if (err) {
      console.log(err);
      callback(err.message);
    } else {
      callback(null, image);
    }
  })
}
//UPDATE : Update image by id
const UpdateImageById = (id, newImage, callback) => {
  imagesModel.findOne({ _id : id }, (err, image) => {
    if (err) {
      callback(err);
    } else {
      image.imageUrl = newImage.imageUrl;
      image.posterId = newImage.posterId;
      image.view = newImage.view;
      image.likes = newImage.likes;
      image.content = newImage.content;
      image.title = newImage.title;
      image.tag = newImage.tag;
      image.createAt = newImage.createAt;

      image.save((err, doc) => {
        if (err) {
          callback(err);
        } else {
          callback(null,doc);
        }
      })
    }
  })
}
//Delete : Delete image
const DeleteImageById = (id, callback) => {
  imagesModel.remove({ _id : id }, (err, image) => {
    if (err) {
      callback(err);
    } else {
      callback(null, image);
    }
  })
}

module.exports = {
  CreateImage,
  GetImage,
  UpdateImageById,
  DeleteImageById
}
