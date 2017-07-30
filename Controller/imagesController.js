const imagesModel = require('../Model/imagesModel');
const express     = require('express');
const Router      = express.Router();

//TO DO Create 4 router for 4 basic method
//POST : Create image
//GET :id : Get image by id
//PUT :id : Update image by id
//DELETE :id : Delete imageby id
Router.post('/', (req,res) => {
  imagesModel.CreateImage(req.body, (err, image) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(image);
    }
  })
});

Router.get('/:id' , (req,res) => {
  imagesModel.GetImage(req.params.id, (err, image) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.send(image);
    }
  })
});

Router.put('/:id' , (req,res) => {
  imagesModel.UpdateImageById(req.params.id, req.body, (err, image) => {
    if (err) {
      res.status(500);
      res.send("Error");
    } else {
      res.status(200);
      res.send("Image is updated");
    }
  })
});

Router.delete('/:id' , (req,res) => {
  imagesModel.DeleteImageById(req.params.id, (err, image) => {
    if (err) {
      res.status(500);
      res.send("Error");
    } else {
      res.status(200);
      res.send("Image is deleted");
    }
  })
});

module.exports = Router;
