import React from "react";
import Link from "next/link";
import {
  FaDiscord,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function CodersComp() {
  return (
    <div className="flex-col justify-items-center text-white bg-gradient-to-bl from-gradient-1-start to-gradient-4-end h-full w-full rounded-md pt-4">
      <div className="flex justify-center">
        <p className="text-3xl mr-10">Notional</p>
      </div>
      <div className="flex justify-center mt-6 ">
        <Link
          className="flex justify-between items-center w-12"
          href="https://github.com/CodeCracker2"
          target="_blank"
        >
          <FaGithub />
        </Link>
        <Link
          className="flex justify-between items-center w-12"
          href="https://twitter.com/agmaso100"
          target="_blank"
        >
          <FaTwitter />
        </Link>
        <Link
          className="flex justify-between items-center w-12"
          href="https://discord.com/channels/@"
          target="_blank"
        >
          <FaDiscord />
        </Link>
      </div>
      <p className="text-center mt-4 mr-12">@2024. All rights reserved </p>
    </div>
  );
}
