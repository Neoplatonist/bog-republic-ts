"use client";

import React, { useEffect, useState } from "react";
import { register } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL!;

export default function HankoProfile() {
  const [stateError, setError] = useState<string | null>(null);

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.error("Failed to register Hanko:", error);
      setError(`Failed to load Hanko profile. Error: ${error.message}`);
    });
  }, []);

  if (stateError) {
    return <div>{stateError}</div>;
  }

  // @ts-ignore
  // eslint-disable-next-line react/jsx-no-undef
  return <hanko-profile />;
}