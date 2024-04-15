type Channel<T> = {
  send(m: T): Promise<void>;
  recv(): Promise<T>;
}

export default Channel;
