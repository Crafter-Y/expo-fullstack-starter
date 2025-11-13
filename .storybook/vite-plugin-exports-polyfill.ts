import type { Plugin } from "vite";

/**
 * Vite plugin to polyfill CommonJS exports for packages that mix CommonJS and ESM.
 * This fixes the "exports is not defined" error in static builds.
 * 
 * This plugin works at the generateBundle stage to modify the final output.
 */
export function exportsPolyfillPlugin(): Plugin {
  return {
    name: "vite-plugin-exports-polyfill",
    apply: "build", // Only apply during build
    generateBundle(_, bundle) {
      // Process each chunk in the bundle
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        
        // Only process JavaScript chunks
        if (chunk.type === "chunk" && fileName.endsWith(".js")) {
          // Check if the chunk contains Object.defineProperty(exports
          if (chunk.code.includes("Object.defineProperty(exports")) {
            // Inject exports polyfill at the beginning
            chunk.code = `var exports = {};\n${chunk.code}`;
            console.log(`✓ Added exports polyfill to ${fileName}`);
          }
        }
      }
    },
  };
}
