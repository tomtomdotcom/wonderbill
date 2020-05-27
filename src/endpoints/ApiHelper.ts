import fetch from 'node-fetch';
const baseUrl = 'http://localhost:3000/providers';

export class WonderbillApiHelper {
  public static async getBills(type: 'gas' | 'internet'): Promise<any> {
    const bills = await this.makeApiRequest(baseUrl, type);
    return bills;
  }

  private static async makeApiRequest(baseUrl: string, path: string): Promise<any> {
    console.log('make request');
    const res = await fetch(`${baseUrl}/${path}`);
    if (res.status !== 200) {
      const text = await res.text();
      throw new Error(`Api Request failed: ${res.status}: ${res.statusText}. ${text}`);
    }
    return await res.json();
  }
}
