import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Calculator, { OPERATORS, VALUES } from ".";

let inputResult: any;

beforeEach(() => {
  render(<Calculator />);
  inputResult = screen.getByRole("textbox");
});

describe("Verificar la existencia de componentes", () => {
  test("verificar que existen los números", () => {
    VALUES.forEach((row) => {
      row.forEach(value => {
        expect(screen.getByText(value)).toBeInTheDocument();
      }) 
    });
  });
  test("verificar que existen las operaciones", () => {
    OPERATORS.forEach((operator) => {
      expect(screen.getByText(operator)).toBeInTheDocument();
    });
  });
  test("verificar que existen un campo de resultado", () => {
    expect(inputResult).toBeInTheDocument();
  });
});

describe("Verificar el comportamiento de los botones", () => {
  test("Cuando se hace click en un número debe actualizar el campo resultado", async () => {
    await userEvent.click(screen.getByRole("button", { name: "0" }));
    expect(inputResult).toHaveValue("0");
  });

  test("Aplicar operador suma", async () => {
    userEvent.click(screen.getByRole("button", { name: "1" }));
    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "1" }));
    expect(inputResult).toHaveValue("1+1");
  });

  test("Aplicar operador resultado", async () => {
    userEvent.click(screen.getByRole("button", { name: "1" }));
    userEvent.click(screen.getByRole("button", { name: "+" }));
    userEvent.click(screen.getByRole("button", { name: "1" }));
    userEvent.click(screen.getByRole("button", { name: "=" }));
    expect(inputResult).toHaveValue("2");
  });
  

  test("Reiniciar la calculadora cuando se hace click en C", () =>  {
    userEvent.click(screen.getByRole("button", { name: 'C'}));
    expect(inputResult).toHaveValue("");
  })

  test("Verificación de error", () =>  {
    userEvent.click(screen.getByRole("button", { name: '1'}));
    userEvent.click(screen.getByRole("button", { name: '+'}));
    userEvent.click(screen.getByRole("button", { name: '+'}));
    userEvent.click(screen.getByRole("button", { name: '='}));
    expect(screen.getByText(/operation error/i)).toBeInTheDocument();
  })
});

export default {};
