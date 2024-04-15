import CommutableCipher from "./CommutableCipher.ts";
import p from "./p.ts";

export default class Message {
  constructor(public value: bigint) {
    if (value < 1n || value >= p) {
      throw new Error('Value out of range');
    }
  }

  static decodeString(s: string) {
    let value = 0n;

    for (const b of new TextEncoder().encode(s)) {
      value <<= 8n;
      value += BigInt(b);
    }

    return new Message(value);
  }

  encodeString() {
    let bytes: number[] = [];

    let value = this.value;

    while (value > 0n) {
      bytes.push(Number(value & 0xffn));
      value >>= 8n;
    }

    return new TextDecoder().decode(Uint8Array.from(bytes.reverse()));
  }

  encrypt(c: CommutableCipher): Message {
    return c.encrypt(this);
  }

  decrypt(c: CommutableCipher): Message {
    return c.decrypt(this);
  }
}
