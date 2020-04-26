const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = {
  dev: false,
  buildDir: 'nuxt'
}

// Init Nuxt.js
const nuxt = new Nuxt(config)

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.nuxtApp = functions.https.onRequest(app)