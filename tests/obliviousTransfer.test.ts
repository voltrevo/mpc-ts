import { expect } from 'chai';

import createLocalChannelPair from '../src/createLocalChannelPair.ts';
import Message from '../src/Message.ts';
import { otSend, otRecv } from '../src/obliviousTransfer.ts';

describe('oblivious transfer', () => {
  it('works', async () => {
    const [sendChannel, recvChannel] = createLocalChannelPair<Message[]>();

    otSend(sendChannel, ['apple', 'mango', 'pear']);
    const result = await otRecv(recvChannel, 1);

    expect(result).to.eq('mango');
  });
});
