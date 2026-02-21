"use client";

import { enableVisualEditing } from "@sanity/visual-editing";
import { useEffect } from "react";

export default function SanityVisualEditing() {
  useEffect(() => {
    const stega = enableVisualEditing();
    return () => stega();
  }, []);

  return null;
}
