import React, { FC, PropsWithChildren } from "react";

const Modal: FC<PropsWithChildren<{ onClose: () => void }>> = ({
  onClose,
  children,
}) => {
  return (
    <div className=" w-full h-full fixed top-[70%] translate-y-[-50%] bg-[rgba(0,0,0,0.8)] start-0 z-[40] overflow-x-hidden overflow-y-auto pointer-events-none">
      <div className="open:mt-7 -open:opacity-100 -open:duration-500 mt-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto border border-[#eee] rounded-xl">
        <div className="flex flex-col shadow-sm rounded-xl pointer-events-auto bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="p-4 overflow-y-auto">{children}</div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-="#hs-large-modal"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
