import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("renders Search By File name", () => {
    render(<App />);
    const search = screen.getByText(/Search By File name/i);
    expect(search).toBeInTheDocument();
  });
});
