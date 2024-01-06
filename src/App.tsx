import "./App.css";
import Test from "./components/Test";

function App() {
  return (
    <>
      {text.split(/\s+/).map((word, order) => (
        <Test key={order} word={word} priority={order}></Test>
      ))}
    </>
  );
}

const text = `
Give me your tired, your poor,
Your huddled masses yearning to breathe free,
The wretched refuse of your teeming shore.
Send these, the homeless, tempest-tost to me,
I lift my lamp beside the golden door!
`;
export default App;
