"use client";

import { ChangeEvent, useState } from "react";
import { cn } from "@/lib/utils";

import CopyIcon from "@/public/images/icon-copy.svg";
import CheckIcon from "@/public/images/icon-check.svg";
import RightArrowIcon from "@/public/images/icon-arrow-right.svg";

export default function Home() {
	const [value, setValue] = useState(5);
	const [uppercase, setUppercase] = useState(false);
	const [lowercase, setLowercase] = useState(false);
	const [numbers, setNumbers] = useState(false);
	const [symbols, setSymbols] = useState(false);
	const [strenght, setStrenght] = useState(0);
	const [password, setPassword] = useState<string | null>(null);
	const [isCopied, setIsCopied] = useState(false);
	const [rating, setRating] = useState(0);

	enum RatingLevel {
		TooWeak = 1,
		Weak = 2,
		Medium = 3,
		Strong = 4,
	}

	function getPasswordRating(rating: RatingLevel): string {
		switch (rating) {
			case RatingLevel.TooWeak:
				return "Too weak!";
			case RatingLevel.Weak:
				return "Weak";
			case RatingLevel.Medium:
				return "Medium";
			case RatingLevel.Strong:
				return "Strong";
			default:
				return "";
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(parseInt(e.target.value));
	};

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		const v = parseInt(e.target.value);
		const percentage = ((v - 5) / 10) * 100;
		e.target.style.background = `linear-gradient(to right, #a4ffaf 0%, #a4ffaf ${percentage}%, #18171f ${percentage}%, #18171f 100%`;
	};

	const CheckItems = [
		{
			itemCase: uppercase,
			setCase: setUppercase,
			strenght: strenght,
			setStrenght: setStrenght,
			text: "Include Uppercase Letters",
			item: "uppercase",
		},
		{
			itemCase: lowercase,
			setCase: setLowercase,
			strenght: strenght,
			setStrenght: setStrenght,
			text: "Include Lowercase Letters",
			item: "lowercase",
		},
		{
			itemCase: numbers,
			setCase: setNumbers,
			strenght: strenght,
			setStrenght: setStrenght,
			text: "Include Numbers",
			item: "numbers",
		},
		{
			itemCase: symbols,
			setCase: setSymbols,
			strenght: strenght,
			setStrenght: setStrenght,
			text: "Include Symbols",
			item: "symbols",
		},
	];

	const CheckLists = ({
		itemCase,
		setCase,
		strenght,
		setStrenght,
		text,
		item,
	}: {
		itemCase: boolean;
		setCase: (value: boolean) => void;
		strenght: number;
		setStrenght: (value: number) => void;
		text: string;
		item: string;
	}) => {
		return (
			<>
				<div
					className={cn("cb w-5 h-5 flex items-center justify-center", {
						"bg-primary border-none": itemCase,
						"bg-background-primary border border-white hover:border-primary":
							!itemCase,
					})}
					aria-hidden="true"
				>
					{itemCase && <CheckIcon />}
				</div>
				<input
					id={item}
					type="checkbox"
					checked={itemCase}
					onChange={() => {
						setCase(!itemCase);
						setStrenght(itemCase ? strenght - 1 : strenght + 1);
					}}
				/>
				<label
					htmlFor={item}
					className="text-[16px] md:text-[18px] font-bold capitalize"
				>
					{text}
				</label>
			</>
		);
	};

	// generate random passowrd
	const generatePassword = () => {
		const length = value;
		const includeUppercase = uppercase;
		const includeLowercase = lowercase;
		const includeNumbers = numbers;
		const includeSymbols = symbols;

		let r = 0;

		if (
			!includeUppercase &&
			!includeLowercase &&
			!includeNumbers &&
			!includeSymbols
		) {
			alert("Please select at least one option.");
			return;
		}

		let charset = "";
		if (includeUppercase) {
			charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			r += 1;
		}
		if (includeLowercase) {
			charset += "abcdefghijklmnopqrstuvwxyz";
			r += 1;
		}
		if (includeNumbers) {
			charset += "0123456789";
			r += 1;
		}
		if (includeSymbols) {
			charset += "!@#$%^&*()";
			r += 1;
		}

		let password = "";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charset.length);
			password += charset[randomIndex];
		}

		setPassword(password);
		setRating(r);
	};

	const copyToClipboard = () => {
		if (!password) {
			alert("Generate a password first!");
			return;
		}

		navigator.clipboard.writeText(password || "");

		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 3000);
	};

	return (
		<main className="flex min-h-screen justify-center p-4 bg-background-primary">
			<div className="container flex items-center justify-center">
				<div className="w-full max-w-[540px] flex flex-col">
					<div className="flex flex-col gap-4">
						<h1 className="text-muted font-medium text-[16px] md:text-[24px] text-center">
							Password Generator
						</h1>
						<div className="h-[80px] bg-background-secondary p-6 flex items-center justify-between w-full">
							<p
								className={cn("text-[24px] md:text-[32px] font-bold", {
									"text-foreground": password,
									"text-muted": !password,
								})}
							>
								{password ? password : "P4$5W0rD!"}
							</p>
							<div className="flex gap-4 items-center">
								{isCopied && (
									<p className="uppercase text-primary font-bold text-[16px] md:text-[18px]">
										copied
									</p>
								)}
								<CopyIcon
									onClick={copyToClipboard}
									className="fill-primary cursor-pointer hover:fill-white"
								/>
							</div>
						</div>
						<div className="bg-background-secondary p-6 flex flex-col gap-8">
							<div className="flex justify-between items-center">
								<p className="text-foreground font-bold text-[16px] md:text-[18px]">
									Character Length
								</p>
								<p className="text-primary font-bold text-[24px] md:text-[32px]">
									{value}
								</p>
							</div>
							{/* slider */}
							<div className="w-full">
								<input
									aria-label="Select a value between 5 and 15"
									type="range"
									min="5"
									max="15"
									value={value}
									onChange={handleChange}
									onInput={onInput}
									className="w-full appearance-none bg-background-primary outline-none slider cursor-pointer"
								/>
							</div>
							{/* checkboxes */}
							<div>
								<ol className="flex flex-col gap-4">
									{CheckItems.map((item, index) => (
										<li key={index} className="flex gap-2 items-center cstm-cb">
											<CheckLists
												itemCase={item.itemCase}
												setCase={item.setCase}
												strenght={item.strenght}
												setStrenght={item.setStrenght}
												text={item.text}
												item={item.item}
											/>
										</li>
									))}
								</ol>
							</div>
							{/* strenght */}
							<div className="flex justify-between bg-background-primary h-[72px] items-center p-6">
								<p className="uppercase text-[16px] md:text-[18px] font-bold text-muted">
									strength
								</p>
								<div className="flex gap-4 items-center">
									<p className="uppercase text-[18px] md:text-[24px] font-bold">
										{getPasswordRating(rating)}
									</p>
									<div className="flex gap-2">
										{Array(4)
											.fill(null)
											.map((_, index) => (
												<div
													key={index}
													className={cn(
														"w-[10px] h-[28px] border border-white",
														{
															"bg-destructive": index < rating && rating == 1,
															"bg-secondary": index < rating && rating == 2,
															"bg-accent": index < rating && rating == 3,
															"bg-primary": index < rating && rating == 4,
														}
													)}
												></div>
											))}
									</div>
								</div>
							</div>
							{/* generate button */}
							<button
								className="bg-primary p-4 text-background-primary uppercase text-[16px] md:text-[18px] font-bold flex justify-center items-center gap-6"
								onClick={generatePassword}
							>
								Generate
								<RightArrowIcon />
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
