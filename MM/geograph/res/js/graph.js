let chartLabel = 'Sütun'
let chartType = 'bar'
let chartLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let chartDatas = [7, 5, 6, 4, 4, 3, 1]
let chartBackgroundColors = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Cyan', 'Orange']
let chartBorderColors = ['Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Cyan']

const vals = { min: null, avg: null, med: null, max: null }

// document.addEventListener('contextmenu', event => event.preventDefault())

const labelsConfig = {
    afterDraw(chart) {
        const { ctx, scales: { x, y } } = chart
        ctx.save()
        ctx.textAlign = 'center'
        ctx.font = '12px Arial'
        ctx.textAlign = 'left'
        ctx.fillStyle = 'black'
        ctx.fillText('Minimum: ' + Number(vals.min).toFixed(2), x.getPixelForValue(0) + 5, y.getPixelForValue(vals.min) - 10)
        ctx.fillStyle = 'blue'
        ctx.fillText('Aritmetik Ortalama: ' + Number(vals.avg, 2).toFixed(2), x.getPixelForValue(0) + 5, y.getPixelForValue(vals.avg) - 10)
        ctx.fillStyle = 'green'
        ctx.fillText('Medyan: ' + Number(vals.med).toFixed(2), x.getPixelForValue(0) + 5, y.getPixelForValue(vals.med) + 10)
        ctx.fillStyle = 'black'
        ctx.fillText('Maksimum:' + Number(vals.max).toFixed(2), x.getPixelForValue(0) + 5, y.getPixelForValue(vals.max) + 10)
        ctx.restore()
    }
}

let configChart = {
    type: chartType,
    plugins: [],
    data: {
        labels: chartLabels,
        datasets: [{
            data: chartDatas,
            label: chartLabel,
            backgroundColor: chartBackgroundColors,
            borderColor: chartBorderColors,
            borderWidth: 1
        }]
    },
    options: {
        plugins: {
            legend: true,
            tooltip: true,
            title: {
                display: false,
                text: 'Chart Title',
            },
            subtitle: {
                display: false,
                text: 'Chart Subtitle',
                color: 'blue',
                font: {
                    size: 12,
                    family: 'tahoma',
                    weight: 'normal',
                    style: 'italic'
                },
                padding: {
                    top: 50,
                    bottom: 10
                }
            }
        },
        scales: {
            x: {
                display: true
            },
            y: {
                display: true,
                beginAtZero: true
            }
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 10
            }
        }
    }
}

const canvas = document.getElementById('canvas')
const myyChart = new Chart(canvas, configChart)

updateChart = function () {
    if (chartType == 'bar') {
        configChart.options.scales.y.beginAtZero = true
    } else {
        configChart.options.scales.y.beginAtZero = false
    }

    if (chartType == 'pie') {
        configChart.options.scales.y.display = false
        configChart.options.scales.x.display = false
    } else {
        configChart.options.scales.y.display = true
        configChart.options.scales.x.display = true
    }

    let myTable = document.getElementById('table')
    chartLabels = []
    chartDatas = []
    for (let j = 1; j < myTable.rows[0].cells.length; j++) {
        if (myTable.rows[0].cells[j].children[0].value != '' && myTable.rows[1].cells[j].children[0].value != '') {
            chartLabels.push(myTable.rows[0].cells[j].children[0].value)
            chartDatas.push(myTable.rows[1].cells[j].children[0].value)
        }
    }

    configChart.data.datasets[0].backgroundColor = chartBackgroundColors
    configChart.data.datasets[0].borderColor = chartBorderColors
    configChart.type = chartType
    configChart.data.datasets[0].label = chartLabel

    if (configChart.data.datasets.length > 1) {
        configChart.data.datasets.splice(1,)
    }

    if (chartType == 'line') {
        const regLine = {
            type: 'line',
            label: 'Eğilim Çizgisi',
            data: [
                [chartLabels[0], chartDatas[0]],
                [chartLabels[chartLabels.length - 1], chartDatas[chartDatas.length - 1]]
            ],
            borderColor: 'blue',
            backgroundColor: 'blue',
            borderWidth: 2
        }
        configChart.data.datasets.push(regLine)

        configChart.data.datasets[1].hidden = true

    }
    if (chartType == 'boxplot') {
        chartLabels = [[], [], [], [], [], [], []]
        chartDatas = [[], [], [], chartDatas, [], [], []]
        configChart.data.datasets[0].backgroundColor = 'Yellow'
        configChart.data.datasets[0].borderColor = 'Blue'
    }

    configChart.plugins = []
    configChart.options.plugins.legend = true

    if (chartType == 'scatter') {
        configChart.plugins[0] = labelsConfig
        configChart.options.plugins.legend = false

        vals.min = Math.min(...chartDatas.map(Number))
        const minLine = {
            type: 'line',
            label: 'Minimum',
            data: [
                [chartLabels[0], Math.min(...chartDatas.map(Number))],
                [chartLabels[chartLabels.length - 1], Math.min(...chartDatas.map(Number))]
            ],
            borderColor: 'black',
            backgroundColor: 'black',
            borderWidth: 1,
            borderDash: [0, 0],
            elements: {
                pointStyle: false,
                point: {
                    radius: 0,
                    hoverRadius: 0,
                }
            }
        }
        configChart.data.datasets.push(minLine)

        vals.avg = eval(chartDatas.join('+')) / chartDatas.length
        const avgLine = {
            type: 'line',
            label: 'Aritmetik Ortalama',
            data: [
                [chartLabels[0], eval(chartDatas.join('+')) / chartDatas.length],
                [chartLabels[chartLabels.length - 1], eval(chartDatas.join('+')) / chartDatas.length]
            ],
            borderColor: 'blue',
            backgroundColor: 'blue',
            borderWidth: 1,
            borderDash: [0, 0],
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 0
                }
            }
        }
        configChart.data.datasets.push(avgLine)

        let medArray = []
        medArray = [...chartDatas]
        medArray.sort(function (a, b) { return a - b })

        let med
        if (medArray.length % 2 == 0) {
            med = (medArray[Math.floor(medArray.length / 2) - 1] + medArray[Math.floor(medArray.length / 2)]) / 2
        } else {
            med = medArray[Math.floor(medArray.length / 2)]
        }

        vals.med = med
        const medianLine = {
            type: 'line',
            label: 'Medyan',
            data: [
                [chartLabels[0], med],
                [chartLabels[chartLabels.length - 1], med]
            ],
            borderColor: 'green',
            backgroundColor: 'green',
            borderWidth: 1,
            borderDash: [0, 0],
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 0
                }
            }
        }
        configChart.data.datasets.push(medianLine)

        vals.max = Math.max(...chartDatas.map(Number))
        const maxLine = {
            type: 'line',
            label: 'Maksimum',
            data: [
                [chartLabels[0], Math.max(...chartDatas.map(Number))],
                [chartLabels[chartLabels.length - 1], Math.max(...chartDatas.map(Number))]
            ],
            borderColor: 'black',
            backgroundColor: 'black',
            borderWidth: 1,
            borderDash: [0, 0],
            elements: {
                point: {
                    radius: 0,
                    hoverRadius: 0
                }
            }
        }
        configChart.data.datasets.push(maxLine)
    }




    /*       //configChart.options.scales.y.display = false
           chartLabels = []
           for (let i = vals.min - 1; i < vals.max + 2; i++) {
               chartLabels.push(i)
           }
   
           chartDatas = [
               { x: 1, y: 1 },
               { x: 3, y: 1 },
               { x: 4, y: 1 },
               { x: 4, y: 2 },
               { x: 5, y: 1 },
               { x: 6, y: 1 },
               { x: 7, y: 1 }]
                    let dd = [...chartDatas]
                   chartDatas = []
                   chartLabels.forEach(e => {
                       console.log(e)
                       console.log(dd)
                       //chartDatas.push({ x: e, y: 0 })
                   }) */

    /*         const arr = [...chartDatas];
            const counts = {};
    
            arr.forEach((el) => {
                counts[el] = counts[el] ? (counts[el] + 1) : 1
            })
    
            console.log(counts) */

    configChart.data.labels = chartLabels
    configChart.data.datasets[0].data = chartDatas
    myyChart.update()
}

const cinputs = document.getElementsByClassName('cinput');
for (const cinput of cinputs) {
    cinput.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key == 'Tab') {
            updateChart()
        }
    })
}

for (const cinput of cinputs) {
    cinput.addEventListener('focusout', e => {
        updateChart()
    })
}

const radioButtons = document.querySelectorAll('input[name="chrtType"]')
for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', e => {
        chartType = radioButton.value
        chartLabel = radioButton.id
        updateChart()
    })
}