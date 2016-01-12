'use latest'

const mongo = require('mongodb').MongoClient
const log = console.log

module.exports = TrackApi

function TrackApi(ctx, done) {
  const dburl = ctx.data.MONGO_TRACK_URL
  const data = {
    event: ctx.data.event,
    status: ctx.data.status,
    createdAt: new Date()
  }

  mongo.connect(dburl, (err, db) => {
    if (err) return done(err)
    db.collection('events').insertMany([data], (err, res) => {
      if (err) return done(err)
      log(`track data saved ${res}`)
      db.close()
      done(null, res.ops[0])
    })
  })
}
