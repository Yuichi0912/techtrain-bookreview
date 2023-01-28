import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LogIn } from "./components/LogIn";

describe("station02 test", () => {
  beforeEach(() => {
    render(
      <Router>
        <LogIn />
      </Router>
    );
  });

  it("component LogIn test", () => {
    expect(screen.getByTestId("email-label")).toBeTruthy();
    expect(screen.getByTestId("email-input")).toBeTruthy();
    expect(screen.getByTestId("password-label")).toBeTruthy();
    expect(screen.getByTestId("password-input")).toBeTruthy();
    expect(screen.getByTestId("login-button")).toBeTruthy();
  });

  it;
});
