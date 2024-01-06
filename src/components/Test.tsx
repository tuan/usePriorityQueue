import { useEffect } from "react";
import usePriorityQueue from "../hooks/queueHook";

type Props = {
  name: string;
  priority: number;
  onLog: (msg: string) => void;
};

const Test = ({ name, priority, onLog: log }: Props) => {
  const { isNext, done } = usePriorityQueue("TestQueue", priority);

  useEffect(() => {
    if (isNext) {
      echoAsync(`hi from ${name}`).then(log).then(done);
    }
  }, [isNext]);

  return <p>{name} is rendered!</p>;
};

async function echoAsync(message: string): Promise<string> {
  return new Promise((resolve, _) => {
    const delay = Math.random() * 1000;
    setTimeout(() => {
      resolve(message + ` - processing time: ${delay}ms`);
    }, delay);
  });
}

export default Test;
