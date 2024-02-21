const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({

  shortId : {
    type: String,
    required: true,
    unique: true
  },

  redirectUrl: {
    type: String,
    required: true,
  },

  visitHistory: [{timeStamp: 
    {
      type: Number,
    }
  }],


  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }

},
{timestamps: true}
);

const UrlDBRef = mongoose.model("url", urlSchema);

module.exports =  UrlDBRef;