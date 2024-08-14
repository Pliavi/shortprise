import clsx from "clsx";
import React from "react";

interface Props extends React.ComponentProps<"menu"> {}

export const SideMenu = ({ children, className, ...props }: Props) => (
  <menu
    className={clsx(
      "flex h-full flex-col justify-between border-e border-e-current border-opacity-80 shadow-md max-w-sm w-fit",
      className
    )}
    {...props}
  >
    <div>
      <div>
        <ul className="pt-4">
          <li>
            <a
              href="#"
              className="flex justify-start items-center px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>

              <span className="text-sm font-medium">Criar atalho</span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex justify-start items-center px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-800 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>

              <span className="text-sm font-medium">Atalhos registrados</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </menu>
);
