import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import CapitalWeather from "./CapitalWeather";

test("Text find", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<CapitalWeather capital="dhaka" />, container);

  const page = screen.getByText("Capital Weather");
  expect(page).toHaveLength(1);
});
