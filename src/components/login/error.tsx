import { Dispatch, SetStateAction } from "react";

const ErrorComponent = (props: {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}) => (
  <div className="w-full flex flex-1 flex-shrink flex-col justify-center items-center">
    <p className="text-base text-center">❌ {props.error}</p>
    <button
      className="w-full h-12 rounded-[5px] border-none text-base my-4 text-white text-center bg-orange-main font-semibold hover:opacity-80 active:opacity-80 focus:opacity-80"
      onClick={() => props.setError("")}
    >
      Try again
    </button>
  </div>
);

export default ErrorComponent;
