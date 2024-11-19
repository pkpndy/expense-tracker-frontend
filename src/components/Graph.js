import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import './graph.css';
import Labbels from "./Labbels";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const config = {
    data: {
        labels: ["Magenta", "Blue", "Orange", "Green", "Red", "Yellow"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100, 50, 80, 70],
                backgroundColor: [
                    "rgb(255, 0, 255)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 165, 0)",
                    "rgb(0, 255, 0)",
                    "rgb(255, 0, 0)",
                    "rgb(255, 255, 0)",
                ],
                hoverOffset: 4,
                borderRadius: 10,
                spacing: 1,
            },
        ],
    },
};

export default function Graph() {
    return (
        <div className="flex justify-content max-w-xs mx-auto">
            <div className="item">
                <div className="chart relative">
                    <Doughnut {...config} />
                    <h3 className="mb-4 font-bold title">
                        Total:
                        <span className="block text-3xl text-emrald-400">
                            ${0}
                        </span>
                    </h3>
                    <h2 className="mb-4 font-bold title">Expense Limit:
                        <span className="block text-3xl text-emrald-400">Add expense limit</span>
                    </h2>
                </div>

                <div className="flex flex-col py-10 gap-4">
                    {/* Label */}
                    <Labbels/>
                </div>
            </div>
        </div>
    );
}
