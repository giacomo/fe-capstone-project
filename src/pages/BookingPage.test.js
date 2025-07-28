import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../components/BookingForm/BookingForm";
import BookingPage from "./BookingPage";
import { initializeTimes, updateTimes } from "./BookingPage";
import {MemoryRouter} from "react-router";

// Mock the API functions
const mockFetchAPI = jest.fn().mockImplementation(date => {
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
});

const mockSubmitAPI = jest.fn().mockImplementation(formData => {
    return true; // Always succeed in tests
});

// Set up the mock API globally for all tests
beforeAll(() => {
    window.fetchAPI = mockFetchAPI;
    window.submitAPI = mockSubmitAPI;
});

// Clean up mocks after all tests
afterAll(() => {
    delete window.fetchAPI;
    delete window.submitAPI;
});

// Reset mock function calls between tests
beforeEach(() => {
    mockFetchAPI.mockClear();
    mockSubmitAPI.mockClear();
});

// Helper function to render with router context
const renderWithRouter = (component) => {
    return render(
        <MemoryRouter>
            {component}
        </MemoryRouter>
    );
};

// Test that BookingPage renders with the correct heading
test('Renders the BookingPage heading', () => {
    renderWithRouter(<BookingPage />);
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
    // Verify that fetchAPI was called during initialization
    expect(mockFetchAPI).toHaveBeenCalled();
});

// Original test for BookingForm
test('Renders the BookingForm heading with times', () => {
    const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const mockUpdateTimes = jest.fn();

    render(
        <BookingForm
            availableTimes={mockAvailableTimes}
            updateTimes={mockUpdateTimes}
        />
    );
    const headingElement = screen.getByLabelText("Choose reservation date");
    expect(headingElement).toBeInTheDocument();
})

// Test for initializeTimes function
test('initializeTimes returns the expected time slots from API', () => {
    // Call the function
    const times = initializeTimes();

    // Expected array of time slots
    const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    // Check if the returned array matches the expected array
    expect(times).toEqual(expectedTimes);

    // Check if the array has the correct length
    expect(times.length).toBe(6);

    // Verify that the API was called
    expect(mockFetchAPI).toHaveBeenCalled();
});

// Test for updateTimes function
test('updateTimes returns API data when action type is dateChange', () => {
    // Create a mock state
    const mockState = ["17:00", "18:00", "19:00"];

    // Create a dateChange action
    const mockAction = { type: 'dateChange', date: '2023-07-15' };

    // Call the function with the state and action
    const newState = updateTimes(mockState, mockAction);

    // Since fetchAPI returns our mock data, we should get these times
    const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    expect(newState).toEqual(expectedTimes);

    // Verify that the API was called with a Date object
    expect(mockFetchAPI).toHaveBeenCalledWith(expect.any(Date));
});

// Test for form submission
test('BookingForm can be submitted by user', () => {
    const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const mockUpdateTimes = jest.fn();
    const mockSubmit = jest.fn();

    // Render form with a mock submission handler
    render(
        <BookingForm
            availableTimes={mockAvailableTimes}
            updateTimes={mockUpdateTimes}
            onSubmit={mockSubmit}
        />
    );

    // Fill out form fields
    const dateInput = screen.getByLabelText("Choose reservation date");
    fireEvent.change(dateInput, { target: { value: '2023-09-20' } });

    const timeSelect = screen.getByLabelText("Choose reservation time");
    fireEvent.change(timeSelect, { target: { value: '19:00' } });

    const guestsInput = screen.getByLabelText("Number of guests, minimum 1, maximum 10");
    fireEvent.change(guestsInput, { target: { value: '4' } });

    const occasionSelect = screen.getByLabelText("Select occasion for reservation");
    fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit reservation form/i });
    fireEvent.click(submitButton);

    // Check if the submit handler was called
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    // Check if it was called with the correct form data
    expect(mockSubmit).toHaveBeenCalledWith({
        date: '2023-09-20',
        time: '19:00',
        guests: 4,
        occasion: 'Anniversary'
    });
});
