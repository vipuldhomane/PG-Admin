import "./App.css";
import { CarouselDemo } from "./components/demo/CarouselDemo";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold  text-center text-red-500">
        Payment Gateway
      </h1>
      <Button>Testing</Button>
      <TableWrapper />
    </>
  );
}
