import React, { useState, useMemo } from 'react';
import Select from 'react-select';

import { useGetTreasury } from "../../hooks/useGetTresuary";

import './ComponentsList.scss';

function ComponentsList() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const { data, isLoading } = useGetTreasury();

    const currency = useMemo(() => {
        const unique = [...new Set(data.map(r => r.currency))];
        return unique.map(item => ({ label: item, value: item }));
    }, [data]);

    const filtered = useMemo(() => {
        if (!selectedOptions.length) return data;
        const selected = new Set(selectedOptions.map(s => s.value));
        return data.filter(row => selected.has(row.currency));
    }, [data, selectedOptions]);


    return (
        <div className="container">
            {
                isLoading
                    ? <h2>Loading...</h2>
                    : (
                        <>
                            <Select
                                isMulti
                                options={currency}
                                value={selectedOptions}
                                onChange={setSelectedOptions}
                                placeholder="Filter by currency..."
                                className="filter"
                            />
                            <table>
                                <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>Currency</th>
                                    <th>Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.map(({ country, currency, rate }, idx) => (
                                    <tr key={idx}>
                                        <td>{country}</td>
                                        <td>{currency}</td>
                                        <td>{rate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )
            }

        </div>
    );
}

export default ComponentsList;