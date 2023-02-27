import "./App.css";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CryptoJS from "crypto-js";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const FormSchema = yup.object().shape({
	encryptionKey: yup.string().required("Encryption Key required!"),
	targetText: yup.string().required("Target Text required!"),
});

function App() {
	const [resultText, setResultText] = useState("");

	const notify = () => toast.success("Succesfully copy text!");

	const { register, control, trigger, getValues, handleSubmit } = useForm({
		defaultValues: {
			encryptionKey: "",
			targetText: "",
			conversionType: "",
		},
		resolver: yupResolver(FormSchema),
	});

	const getPayload = () => {
		const form = getValues();
		const payload = {
			encryptionKey: form.encryptionKey,
			targetText: form.targetText,
			conversionType: form.conversionType,
		};
		return payload;
	};

	const decryptText = (text, encryptionKey) => {
		const encrypted = text.split("---").join("/");
		const bytes = CryptoJS.AES.decrypt(encrypted, encryptionKey);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	};

	const encryptText = (text, encryptionKey) => {
		const ciphertext = CryptoJS.AES.encrypt(text, encryptionKey).toString();
		return ciphertext.split("/").join("---");
	};

	const onSubmit = async () => {
		trigger();
		const payload = getPayload();
		const encryptKey = payload.encryptionKey;
		const targetText = payload.targetText;
		const conversionType = payload.conversionType;

		if (conversionType !== "") {
			if (conversionType === "decrypt") {
				const result = decryptText(targetText, encryptKey);
				setResultText(result);
			} else if (conversionType === "encrypt") {
				const result = encryptText(targetText, encryptKey);
				setResultText(result);
			}
		}
	};

	return (
		<main className={clsx("max-w-sm mx-auto mt-20", "md:max-w-7xl")}>
			<div className={clsx("mx-4")}>
				<div className={clsx("max-w-xl mx-auto flex flex-col gap-1")}>
					<h1
						className={clsx(
							"w-10/12 text-4xl font-semibold text-white",
							"md:w-full md:text-center md:text-[42px]"
						)}
					>
						TextCrypt
					</h1>
					<p
						className={clsx(
							"text-xl text-white font-medium",
							"md:text-center md:text-2xl md:tracking-wide"
						)}
					>
						Simple encryption tools
					</p>
				</div>
				<Toaster />
				<form
					onSubmit={(e) => {
						handleSubmit(onSubmit)(e);
					}}
				>
					<div
						className={clsx("flex flex-col gap-4 mt-9 mx-auto", "md:max-w-lg")}
					>
						<Controller
							name="encryptionKey"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<div className={clsx("flex flex-col gap-2")}>
											<label
												htmlFor="encryptionKey"
												className={clsx(
													"text-sm text-white font-medium",
													"md:text-base"
												)}
											>
												Encryption Key
											</label>
											<input
												{...field}
												name="encryptionKey"
												type="text"
												id="encryptionKey"
												className={clsx(
													"px-4 py-2.5 rounded-lg",
													"md:text-base"
												)}
												placeholder="Insert encryption key here..."
											/>
										</div>
										<small
											className={clsx("-mt-3 text-xs md:text-sm text-white")}
										>
											{error?.message}
										</small>
									</>
								);
							}}
						/>
						<Controller
							name="targetText"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<>
										<div className={clsx("flex flex-col gap-2")}>
											<label
												htmlFor="targetText"
												className={clsx(
													"text-sm text-white font-medium",
													"md:text-base"
												)}
											>
												Target Text
											</label>
											<input
												{...field}
												name="targetText"
												type="text"
												id="targetText"
												className={clsx(
													"px-4 py-2.5 rounded-lg",
													"md:text-base"
												)}
												placeholder="Insert target text here..."
											/>
										</div>
										<small
											className={clsx("-mt-3 text-xs md:text-sm text-white")}
										>
											{error?.message}
										</small>
									</>
								);
							}}
						/>
						<Controller
							name="conversionType"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<div className={clsx("flex flex-col gap-1")}>
										<label
											htmlFor="conversionType"
											className={clsx(
												"text-sm text-white font-medium",
												"md:text-base"
											)}
										>
											Conversion Type
										</label>
										<div className={clsx("flex flex-row gap-4")}>
											<div
												className={clsx(
													"flex gap-1 text-white text-sm",
													"md:text-base"
												)}
											>
												<input
													{...register("conversionType", { required: true })}
													type="radio"
													id="encrypt"
													name="conversionType"
													value="encrypt"
												/>
												<label htmlFor="encrypt">Encrypt</label>
											</div>
											<div
												className={clsx(
													"flex gap-1 text-white text-sm",
													"md:text-base"
												)}
											>
												<input
													{...register("conversionType", { required: true })}
													type="radio"
													id="decrypt"
													name="conversionType"
													value="decrypt"
												/>
												<label htmlFor="decrypt">Decrypt</label>
											</div>
										</div>
										<small
											className={clsx("-mt-3 text-xs md:text-sm text-white")}
										>
											{error?.message}
										</small>
									</div>
								);
							}}
						/>
					</div>
					<div className={clsx("md:max-w-xs md:mx-auto")}>
						<button
							type="submit"
							className={clsx(
								"w-full mt-8 font-semibold bg-gray-300 rounded-lg p-3"
							)}
						>
							Generate Result
						</button>
					</div>
				</form>
				{resultText !== "" && (
					<div
						className={clsx("my-10 mx-auto flex flex-col gap-1", "md:max-w-sm")}
					>
						<p className={clsx("text-white text-sm]")}>Result Text</p>
						<div className={clsx("relative")}>
							<textarea
								className={clsx(
									"w-full rounded-md min-h-[200px] pl-4 pr-14 py-2"
								)}
								value={resultText}
								readOnly
							></textarea>
							<CopyToClipboard
								text={resultText}
								onCopy={() => notify("success")}
							>
								<button
									className={clsx(
										"absolute top-1 right-1 px-2 py-1 rounded-md bg-slate-300",
										"text-xs active:bg-slate-400"
									)}
								>
									Copy
								</button>
							</CopyToClipboard>
						</div>
					</div>
				)}
				<footer
					className={clsx(
						"text-sm text-white text-center py-4",
						"md:text-base"
					)}
				>
					<p>Made with ❤️</p>
					<p>
						<span>By Team Frontend BTW </span>
					</p>
					<p>
						<small>
							<span>R</span>
							<span>D</span>
							<span>D</span>
							<span>S</span>
						</small>
					</p>
				</footer>
			</div>
		</main>
	);
}

export default App;
