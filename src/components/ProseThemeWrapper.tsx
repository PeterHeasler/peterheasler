"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// This component uses client-side state (useTheme) to dynamically
// apply the 'prose-invert' class only in dark mode, fixing the
// specificity conflict that broke light mode.
export function ProseThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  
  // State to handle the hydration safety net
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // While mounting on the client, render a safe wrapper to avoid hydration mismatch
  if (!mounted) {
    // Render the default (light) classes on the server
    return <div className="prose">{children}</div>;
  }

  // Determine if the 'prose-invert' class is needed.
  // We use resolvedTheme because we want to know the final applied theme
  const isDark = resolvedTheme === "dark";

  return (
    <div
      // Apply the base 'prose' class and conditionally apply 'prose-invert'
      // when the resolved theme is dark.
      className={cn("prose", isDark && "prose-invert")}
    >
      {children}
    </div>
  );
}
export default ProseThemeWrapper;