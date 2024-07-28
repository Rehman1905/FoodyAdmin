'use client'
import '../admin.css'
import React, { useRef } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import style from './dahsboard.module.css';
import 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Dashboard() {
    const data = {
        labels: ['KFC', 'KLM', 'American Express', `Mcdonald's`],
        datasets: [{
            data: [20, 30, 50, 100],
            backgroundColor: ['#ff6347', '#d62728', '#9467bd', '#EAAB00'],
            hoverBackgroundColor: ['#ff4500', '#b22222', '#7b68ee', '#FFD700']
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '50%',
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                    return percentage;
                },
                color: '#fff',
                font: {
                    size: 16,
                }
            }
        }
    };
    const data2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Restoranlar',
                data: [150, 60, 90, 300, 360],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }
        ]
    };

    const options2 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#ffffff'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff'
                }
            },
            y: {
                ticks: {
                    color: '#ffffff'
                }
            }
        }
    }
    const data3 = {
        labels: ['Aug \'21', '15 Aug', 'Sep \'21', '15 Sep', 'Oct \'21', '15 Oct', 'Nov \'21'],
        datasets: [
            {
                label: 'USERS',
                data: [30, 22, 11, 20, 22, 19, 18],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: 'REGISTER',
                data: [44, 55, 60, 58, 55, 50, 45],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: true,
                type: 'line'
            },
            {
                label: 'PRODUCTS',
                data: [30, 20, 15, 10, 25, 30, 35],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: 'ORDERS',
                data: [30, 20, 25, 20, 36, 34, 32],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                type: 'bar'
            }
        ]
    };

    const options3 = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ffffff'
                }
            },
            y: {
                ticks: {
                    color: '#ffffff'
                }
            }
        }
    }
    return (
        <div className={style.container}>
            <div className={style.diagram}>
                <Doughnut data={data} options={options} />
            </div>
            <div className={style.diagramRestaurant}>
                <Line data={data2} options={options2} />
            </div>
            <div className={style.diagramList}>
                <Bar data={data3} options={options3} />
            </div>
            <div></div>
        </div>
    );
}
