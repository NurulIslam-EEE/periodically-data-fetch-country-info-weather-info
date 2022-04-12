import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import RawData from "./RawData";

test("h6 tag find", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<RawData />, container);
  // eslint-disable-next-line testing-library/no-node-access
  const h6 = container.querySelectorAll("h6");
  expect(h6).toHaveLength(4);
});