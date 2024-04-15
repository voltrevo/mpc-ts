import Channel from "./Channel.ts";
import CommutableCipher from "./CommutableCipher.ts";
import Message from "./Message.ts";
import assert from "./assert.ts";

export async function otSend(channel: Channel<Message[]>, msgs: string[]) {
  const c = CommutableCipher.random();

  // Send encrypted messages
  await channel.send(msgs.map(m => Message.decodeString(m).encrypt(c)));

  // Receive one message with additional encryption
  const reply = await channel.recv();
  assert(reply.length === 1);

  // Remove our encryption from that chosen message
  await channel.send(reply.map(m => m.decrypt(c)));
}

export async function otRecv(channel: Channel<Message[]>, choice: number) {
  const c = CommutableCipher.random();

  // Get encrypted messages
  const msgs = await channel.recv();
  assert(choice < msgs.length);

  // Choose one, add our encryption
  const chosenMsg = msgs[choice];
  await channel.send([chosenMsg.encrypt(c)]);

  const reply = await channel.recv();
  assert(reply.length === 1);

  // Sender should have removed their encryption, now remove ours
  return reply[0].decrypt(c).encodeString();
}
