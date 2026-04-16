/**
 * Extracts path data from pattern-2.svg and outputs a TypeScript module.
 * Run once: pnpm tsx scripts/extract-calligraphy-paths.ts
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const root = process.cwd();
const SVG_PATH = join(root, "pattern-2.svg");
const OUT_DIR = join(root, "src", "data");
const OUT_PATH = join(OUT_DIR, "calligraphy-paths.ts");

const svg = readFileSync(SVG_PATH, "utf-8");

// Extract viewBox
const vbMatch = svg.match(/viewBox="([^"]+)"/);
const viewBox = vbMatch?.[1] ?? "";

// Extract outer <g> transform (translate)
const outerTransformMatch = svg.match(
  /transform="(translate\([^)]+\))"\s*>\s*<g/,
);
const outerTransform = outerTransformMatch?.[1] ?? "";

// Extract path-level transform (matrix) — shared by all paths
const pathTransformMatch = svg.match(
  /transform="(matrix\([^)]+\))"\s*\/>/,
);
const pathTransform = pathTransformMatch?.[1] ?? "";

// Extract all <path> d attributes (match d=" only after <path ... )
const pathRegex = /<path[^>]*\bd="([^"]+)"/g;
const paths: string[] = [];
let match: RegExpExecArray | null;
while ((match = pathRegex.exec(svg)) !== null) {
  paths.push(match[1]);
}

console.log(`Extracted ${paths.length} paths`);
console.log(`ViewBox: ${viewBox}`);
console.log(`Outer transform: ${outerTransform}`);
console.log(`Path transform: ${pathTransform}`);

// Generate output
const output = `// Auto-generated from pattern-2.svg — do not edit by hand
// Run: pnpm tsx scripts/extract-calligraphy-paths.ts

export const VIEWBOX = "${viewBox}";
export const OUTER_TRANSFORM = "${outerTransform}";
export const PATH_TRANSFORM = "${pathTransform}";

export const PATHS: string[] = [
${paths.map((d) => `  ${JSON.stringify(d)},`).join("\n")}
];
`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, output, "utf-8");
console.log(`Wrote ${OUT_PATH} (${paths.length} paths)`);
