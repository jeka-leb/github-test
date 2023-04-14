import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchForm } from "../SearchForm";
import { renderWithProviders } from "testHelpers/renderWithProviders";

describe('SearchForm component shall', () => {
    it('render input with correct placeholder text', () => {
        renderWithProviders(<SearchForm />)
        const inputElement = screen.getByPlaceholderText(/enter repo url/i);
        expect(inputElement).toBeInTheDocument()
    });

    it('render button with correct name text', () => {
        renderWithProviders(<SearchForm />)
        const buttonElement = screen.getByText(/load issues/i);
        expect(buttonElement).toBeInTheDocument()
    });

    it('render input which displays typed text', () => {
        renderWithProviders(<SearchForm />)
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        act(() => {
            userEvent.type(inputElement, 'https');
        })
        expect(inputElement.value).toBe('https')
    });
})