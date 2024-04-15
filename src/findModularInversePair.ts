export default function findModularInversePair(n: bigint) {
  while (true) {
    const k = randomBigint(n);

    let { x, gcd } = extEuclid(k, n);

    if (gcd !== 1n) {
      continue;
    }

    if (x < 0n) {
      x += n;
    }

    return { k, kInv: x };
  }
}

function extEuclid(a: bigint, b: bigint) {
  if (b === 0n) {
    return { x: 1n, y: 0n, gcd: a };
  }

  let ax = 1n;
  let ay = 0n;

  let bx = 0n;
  let by = 1n;

  while (true) {
    {
      let mul = a / b;
      a -= mul * b;
      ax -= mul * bx;
      ay -= mul * by;

      if (a === 0n) {
        return { x: bx, y: by, gcd: b };
      }
    }

    {
      let mul = b / a;
      b -= mul * a;
      bx -= mul * ax;
      by -= mul * ay;

      if (b === 0n) {
        return { x: ax, y: ay, gcd: a };
      }
    }
  }
}

function randomBigint(limit: bigint) {
  const bits = countBits(limit);

  while (true) {
    let rand = 0n;
    let randBits = 0;

    while (bits - randBits > 52) {
      rand <<= 52n;
      rand += BigInt(Math.random() * (2 ** 52));
      randBits += 52;
    }

    rand <<= BigInt(bits - randBits);
    rand += BigInt(Math.floor(Math.random() * (2 ** (bits - randBits))));

    if (rand < limit) {
      return rand;
    }
  }
}

function countBits(n: bigint) {
  let bits = 0;

  while (n > 0n) {
    n >>= 1n;
    bits++;
  }

  return bits;
}
