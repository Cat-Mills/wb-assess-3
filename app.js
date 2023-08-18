import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = { //?The data used to build the contents of the example page
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code
//* Make a route for /top-fossils that displays data from MOST_LIKED_FOSSILS. 









// app.get('/top-fossils', (req,res) => {
//   res.render('top-fossils.html.njk'
//   // ,{
//   //   fossils:  {
//   //     name: name,
//   //     img: img,
//   //     num_likes: num_likes
//   //   }
//   //   fossils: Object.values(getFossilDetails())
//   //   img: img, name: name, num_likes: num_likes
//   // }
//   )
// })
app.get('/top-fossils', (req,res) => {
  let fossils = Object.values(MOST_LIKED_FOSSILS)
  // fossils = {name: fossils.name, img: fossils.img, num_likes: fossils.num_likes}
  res.render('top-fossils.html.njk',{fossils})
  }
)

app.get('/', (req,res) => {
  res.render('homepage.html.njk')
})

app.get('/get-name', (req,res) => {
  const name = req.params.name
  res.render('top-fossils.html.njk', {name: name})
  // const sess = req.session;
  // sess.name = req.query.name
  // res.render('top-fossils.html.njk')
})



app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});
