import { useState, useRef } from "react";
import { diffWordsWithSpace } from "diff";

export default function Home() {
  const [uses, setUses] = useState(0);
  const [result, setResult] = useState("");
  const textarea1Ref = useRef(null);
  const textarea2Ref = useRef(null);
  const resultRef = useRef(null);

  const compareText = () => {
    const text1 = textarea1Ref.current.value;
    const text2 = textarea2Ref.current.value;

    if (text1 === text2) {
      setResult("No differences found.");
    } else {
      const differences = findDifferences(text1, text2);
      setResult(differences);
    }
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setUses((prev) => prev + 1);
  };

  const findDifferences = (text1, text2) => {
    const diff = diffWordsWithSpace(text1, text2);

    const result = diff
      .map((part, index) => {
        const className = part.added
          ? "bg-green-200"
          : part.removed
          ? "bg-red-200"
          : "";
        return `<span key=${index} class="${className}">${part.value}</span>`;
      })
      .join("");

    return result || "No differences found.";
  };

  return (
    <div className="h-full w-full px-4 gap-10 flex flex-col items-center bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="mb-4 flex justify-between items-end w-full px-4">
        <h1 className="font-bold md:text-3xl underline">Compare your texts!</h1>
        <p className="font-bold  md:text-xl">Usage Count : {uses} </p>
      </div>
      <div className="flex flex-col md:flex-row w-full h-1/2 mb-4">
        <div className="md:w-1/2 p-2">
          <textarea
            ref={textarea1Ref}
            className="border border-black rounded w-full h-96 resize-none p-4"
            placeholder="Text to compare"
          ></textarea>
        </div>
        <div className="md:w-1/2 p-2">
          <textarea
            ref={textarea2Ref}
            className="border border-black rounded w-full h-96 resize-none p-4"
            placeholder="Text to compare"
          ></textarea>
        </div>
      </div>
      <div className="mb-4">
        <button
          onClick={compareText}
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-400 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10"
        >
          Compare Text
        </button>
      </div>
      <div className="bg-gray-100 w-full p-4 border border-gray-200 rounded-lg mb-4">
        <h2 className="font-bold text-lg mb-2">Markers:</h2>
        <div className="flex items-center mb-2">
          <div className="h-4 w-4 bg-green-200 border border-black mr-2"></div>
          <p>Extra texts in the first textarea</p>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 bg-red-200 border border-black mr-2"></div>
          <p>Removed texts from the first text area</p>
        </div>
      </div>
      <div
        ref={resultRef}
        className="bg-white w-full px-4 py-10 overflow-visible mb-10"
      >
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: result }}
        ></div>
      </div>
    </div>
  );
}
