import { useState } from "react";
import './App.css';


export default function App() {

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // try {
    //   const res = await fetch("http://localhost:8080/process", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ input }),
    //   });
    //   const data = await res.json();
    //   if (res.ok) {
    //     setResponse(data.data);
    //   } else {
    //     setResponse(`Error: ${data.error}`);
    //   }
    // } catch (error) {
    //   setResponse("Error: Unable to connect to server");
    // }

    const userData = new URLSearchParams({ input }).toString();

    const url = `/api/data?${userData}`;


    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl mb-4">📡 Input Processor</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow rounded-lg p-4 mb-6">
        <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your input:
        </label>
        <input
          type="text"
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type something..."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Send"}
        </button>
      </form>

      <div className="w-full max-w-lg bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Response:</h2>
        <div className="min-h-[100px] p-3 bg-gray-50 rounded border">
          {response || <p className="text-gray-500 italic">No response yet...</p>}
        </div>
      </div>
    </div>
  );
}
