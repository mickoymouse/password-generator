import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		colors: {
			primary: "#a4ffaf",
			secondary: "#fb7c58",
			accent: "#f8cd65",
			destructive: "#f64a4a",
			"background-primary": "#18171f",
			"background-secondary": "#24232c",
			foreground: "#e6e5ea",
			muted: "#817d92",
			white: "#ffffff",
		},
	},
	plugins: [],
};
export default config;
