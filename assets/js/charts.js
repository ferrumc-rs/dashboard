document.addEventListener('DOMContentLoaded', () => {
    const chartElement = document.querySelector("#tps-chart");
    if (!chartElement) return;

    var options = {
        series: [{
            name: 'TPS',
            data: [20, 20, 19.8, 20, 20, 19.5, 18.2, 19.0, 20, 20, 20, 19.9, 20, 20, 20]
        }],
        chart: {
            type: 'area',
            height: 350,
            fontFamily: 'JetBrains Mono, monospace',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        colors: ['#10b981'],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
            categories: ['14:00', '14:01', '14:02', '14:03', '14:04', '14:05', '14:06', '14:07', '14:08', '14:09', '14:10', '14:11', '14:12', '14:13', '14:14'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: '#525252' } }
        },
        yaxis: {
            min: 0, max: 22, tickAmount: 4,
            labels: { style: { colors: '#525252' } }
        },
        grid: {
            borderColor: '#262626',
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: true } },
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
        },
        theme: { mode: 'dark' }
    };

    var chart = new ApexCharts(chartElement, options);
    chart.render();
});
