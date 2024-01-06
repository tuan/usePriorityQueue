import { useEffect } from "react";
import usePriorityQueue from "../hooks/queueHook";

type Props = {
  word: string;
  priority: number;
};

const Test = ({ word, priority }: Props) => {
  const { isNext, done } = usePriorityQueue("TestQueue", priority, false);

  useEffect(() => {
    if (isNext) {
      const delay = Math.random() * 1000;
      setTimeout(() => {
        done();
      }, delay);
    }
  }, [isNext]);

  return isNext ? <span>{`${word} `}</span> : null;
};

export default Test;
