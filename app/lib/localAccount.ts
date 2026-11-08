const KEY = "hq.account.v1";
const SESSION = "hq.unlocked";

export type Account = {
  name: string;
  hash: string;
  createdAt: string;
};

async function digest(pin: string): Promise<string> {
  const text = `hanzipeak:${pin}`;
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return `djb2:${h.toString(16)}`;
}

export function getAccount(): Account | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Account) : null;
  } catch {
    return null;
  }
}

export async function createAccount(name: string, pin: string): Promise<Account> {
  const trimmed = name.trim().slice(0, 24);
  if (!trimmed) throw new Error("Name is required");
  if (pin.trim().length < 4) throw new Error("PIN must be at least 4 digits");
  const account: Account = {
    name: trimmed,
    hash: await digest(pin.trim()),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify(account));
  setUnlocked(true);
  return account;
}

export async function verifyPin(pin: string): Promise<boolean> {
  const account = getAccount();
  if (!account) return false;
  const hash = await digest(pin.trim());
  return hash === account.hash;
}

export function removeAccount(): void {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(SESSION);
}

export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(SESSION) === "1";
  } catch {
    return false;
  }
}

export function setUnlocked(value: boolean): void {
  try {
    if (value) sessionStorage.setItem(SESSION, "1");
    else sessionStorage.removeItem(SESSION);
  } catch {
    /* ignore */
  }
}
