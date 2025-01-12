import "./App.css";
import { CarouselDemo } from "./components/demo/CarouselDemo";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-3xl font-bold text-center text-red-500">
        Payment Gateway
      </h1>

      <div className="mx-auto">
        <Button>Testing</Button>
        <CarouselDemo />
      </div>
    </div>
  );
}
