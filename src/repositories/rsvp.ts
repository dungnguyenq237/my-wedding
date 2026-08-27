export interface RSVPData {
  name: string;
  guests: number;
  attendance: "accept" | "decline";
  message?: string;
}

export interface RSVPRepository {
  submit(data: RSVPData): Promise<void>;
}

interface StoredRSVP extends RSVPData {
  submittedAt: string;
}

export class LocalStorageRSVPRepository implements RSVPRepository {
  readonly #storageKey: string;

  constructor(storageKey = "my-wedding:rsvp") {
    this.#storageKey = storageKey;
  }

  submit(data: RSVPData): Promise<void> {
    const storedRSVP: StoredRSVP = {
      ...data,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem(this.#storageKey, JSON.stringify(storedRSVP));
    return Promise.resolve();
  }
}
