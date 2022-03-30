import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import CountryInfo from "./CountryInfo";

test("h4 tag find", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<CountryInfo />, container);
  // eslint-disable-next-line testing-library/no-node-access
  const h4 = container.querySelectorAll("h4");
  expect(h4).toHaveLength(2);
});
