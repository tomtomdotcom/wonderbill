import fetch from 'node-fetch';

export class WonderbillApiHelper {
  public static async getBills(field: string): Promise<any> {
    const bills = this.makeApiRequest(`https://localhost:3000/providers/${field}`);

    return bills;
  }

  private static async makeApiRequest(path: string): Promise<any> {
    const res = await fetch(`/${path}`);
    if (res.status !== 200) {
      const text = await res.text();
      throw new Error(`Api Request failed: ${res.status}: ${res.statusText}. ${text}`);
    }
    return await res.json();
  }
}
