"use client";

import type React from "react";
import { Image, Divider } from "@nextui-org/react";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-black">
        <div className="w-full flex justify-center rounded-lg overflow-hidden">
          {children}
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden md:flex flex-1 items-center justify-center p-6 bg-blue-800">
        <div className="w-full px-6 py-12">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-2 mb-8">
              <Image
                src="/logo.png"
                alt="ELS Quiz Maker Logo"
                width={120}
                height={120}
                radius="full"
                className="mx-auto"
              />
            </div>

            <h1 className="font-bold text-3xl text-white text-center mb-10">
              ELS Quiz Maker
            </h1>

            <div className="bg-blue-700/50 backdrop-blur-sm p-6 rounded-lg border border-blue-600/30 w-full">
              <p className="italic text-lg text-center mb-6 text-white">
                "Empowering learning through smart and engaging quizzes."
              </p>
              <p className="text-right font-medium text-white">— ELS Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
