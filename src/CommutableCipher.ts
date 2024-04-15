import Message from "./Message.ts";
import findModularInversePair from "./findModularInversePair.ts";
import p from "./p.ts";

export default class CommutableCipher {
  private constructor(public k: bigint, public kInv: bigint) {}

  static random() {
    const { k, kInv } = findModularInversePair(p - 1n);

    return new CommutableCipher(k, kInv);
  }

  encrypt(m: Message): Message {
    return new Message(modularPowBySq(m.value, this.k, p));
  }

  decrypt(m: Message): Message {
    return new Message(modularPowBySq(m.value, this.kInv, p));
  }
}

function modularPowBySq(base: bigint, exponent: bigint, modulus: bigint) {
  let result = 1n;

  while (exponent > 0n) {
    if (exponent & 1n) {
      result *= base;
      result %= modulus;
    }

    base *= base;
    base %= modulus;
    exponent >>= 1n;
  }

  return result;
}
