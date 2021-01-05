var mongoose = require('mongoose');
var config = require('./config');
const Logs = require("./logs");
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);

mongoose.set("debug", (collectionName, method, query, doc) => {
  if (collectionName != Logs.collection.collectionName) {
    let log = new Logs({
      action: method, colection_name: collectionName, query: JSON.stringify(query),
      doc: JSON.stringify(doc)
    })
    switch (method) {
      case Logs.find.name:
        break;
      case Logs.findOne.name:
        break;
      case "createIndex":
        break
      default:
        log.save()
        console.log("save logs")
        break;
    }

  }

})

//connect db
// mongoose.connect('mongodb://localhost/test');
// mongoose.connect('mongodb://luanangame:Khoa!123@den1.mongo1.gear.host:27001/luanangame');
let options = {

}
if (!process.env.MONGODB_ADDON_URI) {
  mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.db_name}`, options)
    .catch(error => {
      console.log('connection error:', error)
    });

} else {
  mongoose.connect(process.env.MONGODB_ADDON_URI, options).catch(error => {
    console.log('connection error:', error)
  });

}


var db = mongoose.connection;
db.once('open', function () {
  console.log("connect db success");
});
db.on('reconnect', () => { console.log('-> reconnected'); });
db.on('close', () => { console.log('-> lost connection'); });
module.exports = db;
