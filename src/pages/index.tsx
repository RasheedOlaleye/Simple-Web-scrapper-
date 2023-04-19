import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showFetchButton, setShowFetchButton] = useState(false); 

  useEffect(() => {
    const fetchContent = async () => {
     // const corsProxy = ' http://localhost:3000';
    
      console.log("fetching", url); // add this line to debug
      setLoading(true);
      try {
        const res = await fetch( router.query.url);
        if (!res.ok) {
          throw new Error(`Failed to fetch content: ${res.status} ${res.statusText}`);
        }
        const text = await res.text();
        setContent(text);
        setError("");
      } catch (error) {
        console.error(error);
        setError("Failed to fetch content. Please check the URL and try again.");
      } finally {
        setLoading(false);
      }
    };
    if (router.query.url) {
      fetchContent();
      setUrl(router.query.url);
    }
  }, [router.query.url]);


  const handleFetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(router.query.url);
      const text = await res.text();
      setContent(text);
    } catch (err) {
      setError("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (input) => {
    try {
      new URL(input);
      return true;
    } catch (_) {
      return false;
    }
  }


  const handleUrlChange = (e) => {
    const url = e.target.value.trim();
    if (!url) {
      setError("Please enter a URL");
    } else if (!/^https?:\/\//i.test(url)) {
      setError("Invalid URL format");
    } else {
      setUrl(url);
      router.push({ query: { url } });
      setError("");
    }
  };

  const handleCopyToClipboard = () => {
    if (content) {
      navigator.clipboard.writeText(content);
      document.execCommand("copy");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="w-full max-w-4xl flex flex-col items-center justify-center space-y-8">
      <input
        type="text"
        className="w-full max-w-2xl px-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        placeholder="Enter a URL"
        value={url}
        onChange={handleUrlChange}
      />

      <div className="flex items-center justify-between space-x-4 w-full max-w-2xl">
        <button onClick={handleFetchContent} className="bg-green-400 text-white px-4 py-3 rounded-lg focus:outline-none">
          Fetch
        </button>
        <button onClick={() => setContent("")} className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none">
          Clear
        </button>
        <button onClick={handleCopyToClipboard} className="bg-red-600 text-white px-4 py-3 rounded-lg focus:outline-none">
          Copy
        </button>
      </div>
        {loading ? (
          <Spinner />
        ) : (
          <iframe
            title="Web content"
            srcDoc={content}
            sandbox="allow-same-origin allow-scripts allow-popups"
          />
        )}
        {error ? <div className="text-red-500">{error}</div> : <pre>{content}</pre>}
      </div>
    </main>
  )
}
