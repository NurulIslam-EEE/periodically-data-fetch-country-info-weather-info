import { render, screen, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import Story from "./Story";


test("h6 tag find", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  ReactDOM.render(<Story />, container);
  // eslint-disable-next-line testing-library/no-node-access
  const h6 = container.querySelectorAll("h6");
  expect(h6).toHaveLength(4);
});