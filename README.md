# mpc-ts

Experimental TypeScript implementation of MPC.

Currently only oblivious transfer is implemented.

```sh
npm install
npm test
```

This invokes oblivious transfer like so:

```ts
const [sendChannel, recvChannel] = createLocalChannelPair<Message[]>();

otSend(sendChannel, ['apple', 'mango', 'pear']);
const result = await otRecv(recvChannel, 1); // Receive secret at index 1

expect(result).to.eq('mango');
```

This is a cryptographic exchange where the sender sends one of three secrets `apple, mango, pear` to the receiver. The receiver gets to choose which secret they get to see, but the sender doesn't know which one they received.
