import axios from 'axios';
import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';
import { Request, Response, Router } from 'express';

admin.initializeApp({
 credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const router = Router();

router.post('/create/currencies', async (req: Request, res: Response) => {
 const options = {
    method: 'GET',
    url: 'https://restaurants222.p.rapidapi.com/currencies',
    headers: {
      'X-RapidAPI-Key': 'd149cf504dmshf16b4905730f518p1474fdjsn3343a3b494cc',
      'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const currencies = response.data.results;
    const currencyRef = db.collection("currencies");

    currencies.forEach((currency: Currency) => {
      currencyRef.add(currency)
        .then((docRef) => {
          console.log("Currency added with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding currency: ", error);
        });
    });

    res.send(currencies);
  } catch (error) {
    res.send(error);
  }
});

export default router;