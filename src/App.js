import "./App.css";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CryptoJS from "crypto-js";
import { useState } from "react";
// import dropDownIcon from "./assets/svg/select-icon.svg";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

const FormSchema = yup.object().shape({
	encryptionKey: yup.string().required("Encryption Key harus diisi"),
	targetText: yup.string().required("Target Text harus diisi"),
});

function App() {
	const [resultText, setResultText] = useState("");

	const notify = () => toast.success("Anda berhasil copy text.");

	const {
		// watch,
		register,
		control,
		trigger,
		getValues,
		handleSubmit,
		// setError,
	} = useForm({
		defaultValues: {
			encryptionKey: "",
			targetText: "",
			// schoolType: "",
			conversionType: "",
		},
		resolver: yupResolver(FormSchema),
	});

	const getPayload = () => {
		const form = getValues();
		const payload = {
			encryptionKey: form.encryptionKey,
			targetText: form.targetText,
			// schoolType: form.schoolType,
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
		// const schoolType = payload.schoolType;
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
		<main>
			<div className={clsx("max-w-sm mx-auto mt-8", "md:max-w-7xl")}>
				<div className={clsx("max-w-xl mx-auto")}>
					<h1
						className={clsx(
							"w-10/12 md:w-full text-4xl font-semibold text-white"
						)}
					>
						Generate URL Public Discussion
					</h1>
				</div>
				<Toaster />
				<form
					onSubmit={(e) => {
						handleSubmit(onSubmit)(e);
					}}
				>
					<div
						className={clsx("flex flex-col gap-4 mt-9", "md:max-w-sm mx-auto")}
					>
						<Controller
							name="encryptionKey"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<div className={clsx("flex flex-col gap-1")}>
										<label
											htmlFor="encryptionKey"
											className={clsx("text-sm text-white")}
										>
											Encryption Key
										</label>
										<input
											{...field}
											name="encryptionKey"
											type="text"
											id="encryptionKey"
											className={clsx("px-4 py-2 rounded-md")}
											placeholder="Insert encryption key here..."
										/>
										<span
											className={clsx(
												"mt-1 text-main-red-800 text-sm text-white"
											)}
										>
											{error?.message}
										</span>
									</div>
								);
							}}
						/>
						<Controller
							name="targetText"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<div className={clsx("flex flex-col gap-1")}>
										<label
											htmlFor="targetText"
											className={clsx("text-sm text-white")}
										>
											Target Text
										</label>
										<input
											{...field}
											name="targetText"
											type="text"
											id="targetText"
											className={clsx("px-4 py-2 rounded-md")}
											placeholder="Insert target text here..."
										/>
										<span
											className={clsx(
												"mt-1 text-main-red-800 text-sm text-white"
											)}
										>
											{error?.message}
										</span>
									</div>
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
											className={clsx("text-sm text-white")}
										>
											Conversion Type
										</label>
										<div className={clsx("flex felx-col gap-4")}>
											<div className={clsx("flex gap-1 text-white")}>
												<input
													{...register("conversionType", { required: true })}
													type="radio"
													id="encrypt"
													name="conversionType"
													value="encrypt"
												/>
												<label htmlFor="encrypt">encrypt</label>
											</div>
											<div className={clsx("flex gap-1 text-white")}>
												<input
													{...register("conversionType", { required: true })}
													type="radio"
													id="decrypt"
													name="conversionType"
													value="decrypt"
												/>
												<label htmlFor="decrypt">decrypt</label>
											</div>
										</div>
										<span
											className={clsx(
												"mt-1 text-main-red-800 text-sm text-white"
											)}
										>
											{error?.message}
										</span>
									</div>
								);
							}}
						/>
						{/* <Controller
							name="schoolType"
							control={control}
							render={({ field, fieldState: { error } }) => {
								return (
									<div className={clsx("flex flex-col gap-1")}>
										<label
											htmlFor="schoolType"
											className={clsx("text-sm text-white")}
										>
											School Type
										</label>
										<div className={clsx("flex relative")}>
											<select
												{...field}
												{...register("schoolType")}
												className={clsx("px-4 py-2 rounded-md w-full")}
											>
												<option value="">Select School Type</option>
												<option value="ptn">PTN</option>
												<option value="ptk">PTK</option>
											</select>
											<img
												alt="icon-down"
												src={dropDownIcon}
												width="15px"
												height="15px"
												className={clsx("absolute right-3 inset-y-1/4 mt-1.5")}
											/>
										</div>
										<span
											className={clsx(
												"mt-1 text-main-red-800 text-sm text-white"
											)}
										>
											{error?.message}
										</span>
									</div>
								);
							}}
						/> */}
					</div>
					<div className={clsx("md:max-w-xs md:mx-auto")}>
						<button
							type="submit"
							className={clsx(
								"w-full mt-8 font-semibold bg-gray-300 rounded-lg py-2 px-3"
							)}
						>
							Generate Result
						</button>
					</div>
				</form>
				{resultText !== "" && (
					<div
						className={clsx("my-10 flex flex-col gap-1", "md:max-w-sm mx-auto")}
					>
						<p className={clsx("text-white text-sm]")}>Result Text</p>
						<div className={clsx("relative")}>
							<textarea
								className={clsx("w-full rounded-md min-h-[200px] px-4 py-2")}
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
				<footer className={clsx("text-white text-center py-4")}>
					Made with ❤️. By Team Frontend BTW <small>RDDS</small>
				</footer>
			</div>
		</main>
	);
}

export default App;
