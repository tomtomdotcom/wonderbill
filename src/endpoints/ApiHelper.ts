import fetch from 'node-fetch';
import fs from 'fs';
import moment from 'moment';
const baseUrl = 'http://localhost:3000/providers';

export class WonderbillApiHelper {
  public static async getBills(type: 'gas' | 'internet'): Promise<any> {
    let bills = await this.makeApiRequest(baseUrl, type);

    // If the service has return no bills, we get them from our store.
    if (!bills) {
      bills = await readFile('./store.json');
      console.log(`Successfully retrieved bill data from store @ ${moment().format()}`);
      return JSON.parse(bills);
    }

    const stringifyBills = JSON.stringify(bills);
    // Whenever we successfully get the bills store it (low level caching)
    fs.writeFile('./store.json', stringifyBills, err => {
      if (err) throw err;
      console.log(`Local store updated with latest bill data @: ${moment().format()} `);
    });
    return bills;
  }

  private static async makeApiRequest(baseUrl: string, path: string): Promise<any> {
    const res = await fetch(`${baseUrl}/${path}`);
    if (res.status !== 200) {
      console.log('3rd Party API is down, getting most recent data from store.');
      return;
    }

    const response = await res.json();
    return response;
  }
}

async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
