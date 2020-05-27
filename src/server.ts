import express from 'express';
import * as providers from './providers.json';
const app = express();
const port = 3000;
import * as bills from './endpoints/bills';

const FAILURE_PROBABILITY = 0.5;

function randomFailuresMiddleware(_, res, next) {
  if (Math.random() > 1 - FAILURE_PROBABILITY) {
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(500, res.headers);
    return res.end('#fail');
  }
  next();
}

app.use(randomFailuresMiddleware);

app.get('/providers/:id', (req, res) => {
  const bills = providers[req.params.id];
  if (!bills) return res.status(404).end();
  res.send(bills);
});

app.get('/failsafe', bills.handler);

app.listen(port, () => console.log(`Providers server listening at http://localhost:${port}`));
