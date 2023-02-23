import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
	render(<App />);
	const linkElement = screen.getByText("Tools for Encrypt/Decrypt Text");
	expect(linkElement).toBeInTheDocument();
});
