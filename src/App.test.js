import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from "@testing-library/react";
import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Render the page", () => {
  act(() => {
    render(<App />, container);
  });
  expect(container.textContent).toBe(
    "Book FinderWelcome to my storeBook's nameSearch the world's most comprehensive index of full-text books.Search© 2021"
  );
});

it("Check search of the page", async () => {
  const onChange = jest.fn();
  act(() => {
    render(<App />, container);
  });

  const button = document.querySelector("[data-testid=toggle]");
  const search = document.querySelector("[data-testid=search]");
  expect(button.innerHTML).toBe("Search");
  search.value = "Teste 2";
  expect(search.value).toBe("Teste 2");
});
