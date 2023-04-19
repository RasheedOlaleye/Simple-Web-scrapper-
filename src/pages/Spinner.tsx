

export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <svg
        className="animate-spin h-12 w-12 text-blue-500"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10z"
        ></path>
        <path
          fill="currentColor"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10z"
        ></path>
      </svg>
    </div>
  );
}
