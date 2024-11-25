import React from 'react';

const obj = [
    {
        type: "Savings",
        color: "rgb(255, 0, 255)",
        percent: 45,
    },
    {
        type: "Sidechick",
        color: "rgb(54, 162, 235)",
        percent: 20,
    },
];

export default function Labbels() {
    return (
        <>
            {obj.map((v, i) => (
                <LabbelComponent key={i} data={v} />
            ))}
        </>
    );
}

function LabbelComponent({ data }) {
    if (!data) return null;

    return (
        <div
            className="labbels flex items-center"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 12px',
                marginBottom: '8px',
                borderLeft: `8px solid ${data.color ?? 'rgb(255, 0, 255)'}`,
                backgroundColor: '#f9f9f9',
                borderRadius: '6px',
            }}
        >
            <span
                className="label-name"
                style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333',
                }}
            >
                {data.type ?? ''}
            </span>
            <span
                className="label-percent"
                style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#444',
                }}
            >
                {data.percent ?? 0}%
            </span>
        </div>
    );
}
