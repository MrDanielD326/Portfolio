"use client";

import { Copyright } from "lucide-react";
import config from "@/lib/config.json";

export function Footer() {
	const { name, title, logo } = config.personal;
	return (
		<footer className="py-4 md:py-4 border-t border-[#444444] bg-background/100">
			<div className="container mx-auto px-4 md:px-6 text-center">
				<p className="text-[#B0B0B0] text-sm md:text-base flex items-center justify-center gap-2">
					<Copyright className="w-4 h-4" /> {new Date().getFullYear()} {logo} {name} | {title}
				</p>
			</div>
		</footer>
	);
}
