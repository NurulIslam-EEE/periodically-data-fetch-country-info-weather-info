import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import CapitalWeather from "./CapitalWeather";

test("h2 tag find", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<CapitalWeather capital="dhaka" />, container);

  const page = screen.getByText("Temperature:");
  expect(page).toHaveLength(1);
});
