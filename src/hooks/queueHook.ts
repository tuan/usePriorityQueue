import FastPriorityQueue from "fastpriorityqueue";
import { useCallback, useEffect, useRef } from "react";
import { useState } from "react";

type QueueItem = {
  priority: number;
  id: Symbol;
  resolve?: () => void;
  reject?: () => void;
};

const queueMap = new Map<string, FastPriorityQueue<QueueItem>>();

function register(name: string, priority: number, id: Symbol): Promise<void> {
  if (queueMap.has(name)) {
    return new Promise<void>((resolve, reject) => {
      const queue = queueMap.get(name);

      if (queue!.isEmpty()) {
        queue!.add({ priority, id });
        // first item in queue can start right away
        resolve();
        return;
      }

      queue!.add({ priority, id, resolve, reject });
    });
  }

  const newQueue = new FastPriorityQueue<QueueItem>(
    (a, b) => a.priority < b.priority
  );
  newQueue.add({ priority, id });
  queueMap.set(name, newQueue);
  return Promise.resolve();
}

function isTopOfPriorityQueue(queueName: string, id: Symbol): boolean {
  const queue = queueMap.get(queueName);
  if (queue == null || queue.isEmpty()) {
    return true;
  }

  return id === queue.peek()!.id;
}

function moveNextInQueue(queueName: string) {
  const queue = queueMap.get(queueName);
  queue?.poll();
  queue?.peek()?.resolve?.();
}

const usePriorityQueue = (queueName: string, priority: number) => {
  const [isNext, setIsNext] = useState(false);
  const id = useRef<Symbol | null>(null);

  const done = useCallback(() => {
    if (!isNext || id.current == null) {
      console.warn(`Your not ready yet! This is no-op.`);
      return;
    }

    const isTopOfQueue = isTopOfPriorityQueue(queueName, id.current);
    if (isTopOfQueue) {
      moveNextInQueue(queueName);
      setIsNext(false);
    } else {
      console.warn(`Your not ready yet! This is no-op.`);
    }
  }, [isNext]);

  useEffect(() => {
    id.current = Symbol("id");

    register(queueName, priority, id.current)
      .then(() => {
        setIsNext(true);
      })
      .catch(() => {
        setIsNext(false);
      });

    return () => {
      if (id.current == null) {
        return;
      }

      const queue = queueMap.get(queueName)!;

      // TODO: should use indexed priority queue to make the remove operation fast
      const item = queue.removeOne((item) => item.id === id.current);
      item?.reject?.();

      id.current = null;
    };
  }, []);

  return { isNext, done };
};

export default usePriorityQueue;
