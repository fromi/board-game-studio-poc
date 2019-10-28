import mongoose from 'mongoose'
import express from 'express'
import path from 'path'
import {setup} from '@bga/not-alone'

const app = express();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/your-app-name');

const Game = mongoose.Schema({state: Object})

app.post('/api/not-alone', (req, res) => {
  const game = setup({numberOfPlayers: 3})
  game.save().then(() => res.json(game))
})

app.get('/api/not-alone', (req, res) => {
  Game.find().then((games) => res.json(games))
})

// Serve static files from the React app
app.use('/not-alone', express.static(path.join(__dirname, 'packages/not-alone-ui/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/packages/not-alone-ui/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
