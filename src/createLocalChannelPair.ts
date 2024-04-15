import AsyncQueue from "./AsyncQueue";
import Channel from "./Channel";

export default function createLocalChannelPair<T>(): [Channel<T>, Channel<T>] {
  const queueA = new AsyncQueue<T>();
  const queueB = new AsyncQueue<T>();

  return [
    {
      async send(m) {
        queueA.push(m);
      },
      async recv() {
        return await queueB.shift();
      }
    },
    {
      async send(m) {
        queueB.push(m);
      },
      async recv() {
        return await queueA.shift();
      }
    },
  ];
}
