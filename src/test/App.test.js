import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

global.fetch = jest.fn();

const mockData = {
    data: [
        { country: 'Japan', currency: 'Yen', exchange_rate: '110.5' },
        { country: 'United Kingdom', currency: 'Pound', exchange_rate: '0.75' },
        { country: 'European Union', currency: 'Euro', exchange_rate: '0.85' },
    ],
};

describe('App component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders exchange rates table', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => mockData,
        });

        render(<App />);

        expect(screen.getByText(/exchange rates/i)).toBeInTheDocument();

        // Wait for table to be populated
        await waitFor(() => {
            expect(screen.getByText('Japan')).toBeInTheDocument();
            expect(screen.getByText('Yen')).toBeInTheDocument();
            expect(screen.getByText('110.5')).toBeInTheDocument();
        });
    });

    test('handles API fetch failure gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('API is down'));

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<App />);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Failed to fetch exchange rates'),
                expect.any(Error)
            );
        });

        consoleSpy.mockRestore();
    });
});
