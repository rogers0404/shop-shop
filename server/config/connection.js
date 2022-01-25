const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mernshopping', {
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://rogers0404:Alejandro.1210@cluster0.y0flo.mongodb.net/shop-shop?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

module.exports = mongoose.connection;
