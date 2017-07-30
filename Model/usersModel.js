const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require ('bcrypt');

const usersSchema = new Schema({
  username : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
    //TODO validate password (eg: at least 6 characters)
  },
  avatar : {
    type : String
  },
  email : {
    type : String,
    validate : {
      validator : (value) => {
        return /\S+@\S+\.\S+/.test(value);
      },
      message : "Invalid email address"
    }
  },
  active : {
    type : Boolean,
    default : true
  }
}, { timestamps : { createdAt: 'created_at' }}, { collection : 'users'});

usersSchema.pre('save' , function (next) {
  let user = this;
  console.log('pre salt : ', user);

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    })
  })
});
const usersModel = mongoose.model('users', usersSchema);

//TO DO
//Create 4 basic function CREATE - READ - UPDATE - DELETE (CRUD)

//Create : create new user
const CreateUser = (userInfo, callback) => {
  let newUser = {
    username : userInfo.username,
    password : userInfo.password,
    avatar   : userInfo.avatar,
    email    : userInfo.email
  }
  usersModel.create(newUser, (err, doc) => {
    if (err) {
      console.log('Err mongo db: ' , err.message);
      callback(err);
    } else {
      callback(null,doc);
    }
  })
}
//Read : get user by id
const GetUserById = (id, callback) => {
  return usersModel.findOne({ _id : id}, (err, user) => {
    if (err) {
      callback(err);
    } else {
      let result = {
        username : user.username,
        email    : user.email,
        avatar   : user.avatar
      }
      callback(null, result);
    }
  })
}
//Update : update user by id
const UpdateUserById = (id, newUser, callback) => {
  usersModel.findOne({ _id : id}, (err,doc) => {
    if (err) {
      console.log(err);
      callback(err.message);
    } else {
      doc.username = newUser.username;
      doc.password = newUser.password;
      doc.email    = newUser.email;
      doc.avatar   = newUser.avatar;
      doc.active   = newUser.active;

      doc.save((err,doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, doc);
        }
      });
    }
  });
}
//Delete : delete user by id
const DeleteUserById = (id, callback) => {
  usersModel.remove({ _id : id }, (err, user) => {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  })
}

module.exports = {
  CreateUser,
  GetUserById,
  UpdateUserById,
  DeleteUserById
}
