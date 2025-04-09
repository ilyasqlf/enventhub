import express from 'express';
const router = express.Router();

router.get('/search', (req, res) => {
    const query = req.query.query?.trim().toLowerCase();
  
    const validSearches = ['concerts', 'spectacles', 'sports', 'jeux vidéos', 'nature et bien etre'];
  
    if (validSearches.includes(query)) {
      //  redirection vers le bon port frontend
      return res.redirect('http://localhost:3001/events');
    } else {
      return res.redirect('http://localhost:3001/not-found');
    }
  });

  export default router;