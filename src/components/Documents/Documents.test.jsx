import { Documents } from "./Documents";
import { render, screen, fireEvent } from "@testing-library/react";

const data = [
  {
    type: "pdf",
    name: "Public Holiday policy",
    size: 127,
    added: "2017-12-06",
  },
  {
    type: "pdf",
    name: "Personal leave policy",
    size: 125,
    added: "2016-12-06",
  },
  {
    type: "folder",
    name: "Expenses",
    size: 340,
    files: [
      {
        type: "doc",
        name: "Expenses claim form",
        added: "2017-05-02",
        size: 220,
      },
      {
        type: "doc",
        name: "Fuel allowances",
        added: "2017-05-03",
        size: 120,
      },
    ],
  },
];

describe("Documents", () => {
  test("renders documents", () => {
    const { container } = render(<Documents data={data} />);
    expect(container).toMatchSnapshot();
  });

  test("renders columns", () => {
    render(<Documents data={data} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByText("Date Added")).toBeInTheDocument();
  });

  test("renders data", () => {
    render(<Documents data={data} />);
    expect(screen.getByText("2017-12-06")).toBeInTheDocument();
    expect(screen.getByText("125")).toBeInTheDocument();
    expect(screen.getByText("2016-12-06")).toBeInTheDocument();
  });

  test("opens Expenses folder", () => {
    render(<Documents data={data} />);
    const expensesFolder = screen.getByText("Expenses");
    fireEvent.click(expensesFolder);
    expect(screen.getByText("Expenses claim form")).toBeInTheDocument();
    expect(screen.getByText("Fuel allowances")).toBeInTheDocument();
  });

  describe("Sorts data based on column", () => {
    test("sorts by name ascending", () => {
      render(<Documents data={data} />);
      const nameColumn = screen.getByText("Name");
      fireEvent.click(nameColumn);
      const cells = screen.getAllByTestId("documents-name");
      expect(cells[0]).toHaveTextContent("Expenses");
      expect(cells[1]).toHaveTextContent("Personal leave policy");
      expect(cells[2]).toHaveTextContent("Public Holiday policy");
    });
    test("sorts by name descending", () => {
      render(<Documents data={data} />);
      const nameColumn = screen.getByText("Name");
      fireEvent.click(nameColumn);
      fireEvent.click(nameColumn);
      const cells = screen.getAllByTestId("documents-name");
      expect(cells[0]).toHaveTextContent("Public Holiday policy");
      expect(cells[1]).toHaveTextContent("Personal leave policy");
      expect(cells[2]).toHaveTextContent("Expenses");
    });

    test("sorts by date ascending", () => {
      render(<Documents data={data} />);
      const dateColumn = screen.getByText("Date Added");
      fireEvent.click(dateColumn);
      const cells = screen.getAllByTestId("documents-name");
      expect(cells[0]).toHaveTextContent("Expenses");
      expect(cells[1]).toHaveTextContent("Personal leave policy");
      expect(cells[2]).toHaveTextContent("Public Holiday policy");
    });
    test("sorts by date descending", () => {
      render(<Documents data={data} />);
      const dateColumn = screen.getByText("Date Added");
      fireEvent.click(dateColumn);
      fireEvent.click(dateColumn);
      const cells = screen.getAllByTestId("documents-name");
      expect(cells[0]).toHaveTextContent("Public Holiday policy");
      expect(cells[1]).toHaveTextContent("Personal leave policy");
      expect(cells[2]).toHaveTextContent("Expenses");
    });
  });

  describe("Filters data based on search", () => {
    test("filter by parent document name", () => {
      render(<Documents data={data} />);
      const search = screen.getByLabelText(/Search By File name/i);
      fireEvent.change(search, { target: { value: "personal" } });
      expect(screen.getByText("Personal leave policy")).toBeInTheDocument();
      const rows = screen.getAllByRole("row");
      rows.shift(); // first row is columns
      rows.forEach((row) => {
        expect(row).toHaveTextContent(/personal/i);
      });
    });

    test("filter by child document name", () => {
      render(<Documents data={data} />);
      const search = screen.getByLabelText(/Search By File name/i);
      fireEvent.change(search, { target: { value: "Fuel" } });
      fireEvent.click(screen.getByText("Expenses"));
      expect(screen.getByText("Expenses")).toBeInTheDocument();
      expect(screen.getByText("Fuel allowances")).toBeInTheDocument();
    });
  });
});
