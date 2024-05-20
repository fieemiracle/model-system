module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const SignSchema = new Schema({
    // username, password, repassword, phone, email, avatar, status
    userId: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    repassword: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: false
    },
    avatar: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    signtime: {
      type: Number,
      require: true
    },
    expiretime: {
      type: Number,
      require: true
    }
  });

  return mongoose.model('Sign', SignSchema);
};