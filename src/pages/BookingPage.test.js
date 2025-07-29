import {render, screen, waitFor} from "@testing-library/react";
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
test('Renders the BookingPage heading', async () => {
    renderWithRouter(<BookingPage />);
    // eslint-disable-next-line testing-library/no-unnecessary-act
    const headingElement = screen.getByText("Reserve a table");

    await waitFor(() => {
        expect(headingElement).toBeInTheDocument();
    });

    // Verify that fetchAPI was called during initialization
    expect(mockFetchAPI).toHaveBeenCalled();
});


test('Renders the BookingForm heading with times', async () => {
    const mockAvailableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const mockUpdateTimes = jest.fn();

    render(
        <BookingForm
            availableTimes={mockAvailableTimes}
            updateTimes={mockUpdateTimes}
        />
    );
    await waitFor(() => {
        const headingElement = screen.getByLabelText("Choose reservation date");
        expect(headingElement).toBeInTheDocument();
    });
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
