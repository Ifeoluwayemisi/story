"use client";

import { Button } from "@/components/primitives/button";

// Opens the browser print dialog — "Save as PDF" keeps the export faithful to
// the resume document on screen.
export function PrintResumeButton() {
  return <Button onClick={() => window.print()}>Print / Save as PDF</Button>;
}
