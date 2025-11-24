
import Header from "./components/Header";
import MultiStream from "./components/MultiStream";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <main className="container mx-auto px-6 py-8">
          {" "}
          <MultiStream />
        </main>
      </div>
    </>
  );
}

export default App;
