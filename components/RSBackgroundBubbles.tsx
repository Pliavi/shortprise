"use client";

import { useAppStore } from "@/app/stores/AppStore";
import clsx from "clsx";

export const RSBackgroundBubbles = () => {
  const status = useAppStore((state) => state.status);

  return (
    <>
      <div
        className={clsx([
          "absolute right-[25%] bg-opacity-50 w-4/12 aspect-square rounded-full origin-top-right sm:animate-spin-slow sm:transition-colors sm:duration-500",
          status === "" && "bg-pink-500",
          status === "loading" && "bg-yellow-500",
          status === "error" && "bg-red-500",
          status === "success" && "bg-green-500",
        ])}
      ></div>
      <div
        className={clsx([
          "absolute bottom-[50%] bg-opacity-50 w-4/12 aspect-square rounded-full origin-bottom sm:animate-spin-slow sm:transition-colors sm:duration-500",
          status === "" && "bg-purple-500",
          status === "loading" && "bg-yellow-500",
          status === "error" && "bg-red-500",
          status === "success" && "bg-green-500",
        ])}
      ></div>
      <div
        className={clsx([
          "absolute left-[25%] bg-opacity-50 w-4/12 aspect-square rounded-full origin-bottom-left sm:animate-spin-slow sm:transition-colors sm:duration-500",
          status === "" && "bg-orange-500",
          status === "loading" && "bg-yellow-500",
          status === "error" && "bg-red-500",
          status === "success" && "bg-green-500",
        ])}
      ></div>
      <div
        className={clsx([
          "absolute top-[50%] bg-opacity-50 w-4/12 aspect-square rounded-full origin-top sm:animate-spin-slow sm:transition-colors sm:duration-500",
          status === "" && "bg-cyan-500",
          status === "loading" && "bg-yellow-500",
          status === "error" && "bg-red-500",
          status === "success" && "bg-green-500",
        ])}
      ></div>
    </>
  );
};
