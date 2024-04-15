import CommutableCipher from "./CommutableCipher.ts";
import Message from "./Message.ts";
import assert from "./assert.ts";

type Channel<T> = {
  push(m: T): Promise<void>;
  next(): Promise<T>;
}

export async function otSend(channel: Channel<Message[]>, msgs: string[]) {
  const c = CommutableCipher.random();

  // Send encrypted messages
  await channel.push(msgs.map(m => Message.decodeString(m).encrypt(c)));

  // Receive one message with additional encryption
  const reply = await channel.next();
  assert(reply.length === 1);

  // Remove our encryption from that chosen message
  await channel.push(reply.map(m => m.decrypt(c)));
}

export async function otRecv(channel: Channel<Message[]>, choice: number) {
  const c = CommutableCipher.random();

  // Get encrypted messages
  const msgs = await channel.next();
  assert(choice < msgs.length);

  // Choose one, add our encryption
  const chosenMsg = msgs[choice];
  await channel.push([chosenMsg.encrypt(c)]);

  const reply = await channel.next();
  assert(reply.length === 1);

  // Sender should have removed their encryption, now remove ours
  return reply[0].decrypt(c).encodeString();
}
