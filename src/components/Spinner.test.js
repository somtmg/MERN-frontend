import { act } from "react";
import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";
describe("Spinner", () => {
    test("render correctly", () => {
        // render testing
        act(() => {
            render(<Spinner />);
        })
        // screen.getByTestId() is used to find the elements by their data-testiD attributes
        const containerDiv = screen.getByTestId("spin-container");
        // checks if elements are in the DOM
        expect(containerDiv).toBeInTheDocument();
        const innerDiv = screen.getByTestId("inner-container");
        expect(innerDiv).toBeInTheDocument();
    })
})