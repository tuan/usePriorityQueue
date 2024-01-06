`usePriorityQueue` hook allows components to queue their work based on priority.

# Usage:

```js
const [isNext, done] = usePriorityQueue("Queue Name", priorityNumber);
```

Each component:

- can use `isNext` to check if it can start executing their logic.
- call `done()` to let the next component know that they are next.

Note: the order of the rendering matters. If a component is the first to queue, it will get executed first regardless of its priority. Similar to how we process task queue, if there's nothing in the queue, we will pick task even when it's low priority.

# Example:

The test app in this repo renders a list of Test components.
Each test component executes `echoAsync()` which simulates random delay in processing. `Test` component X is given priority X.
When you run the example, the messages should be printed in the order of the priority.
