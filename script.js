const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Jasim" },
  { minDegree: 31, maxDegree: 90, value: "Ibrahim" },
  { minDegree: 91, maxDegree: 150, value: "Shofiq" },
  { minDegree: 151, maxDegree: 210, value: "Rifat" },
  { minDegree: 211, maxDegree: 270, value: "Teebro" },
  { minDegree: 271, maxDegree: 330, value: "Jisan" },
  { minDegree: 331, maxDegree: 360, value: "Jasim" },
];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16];

//background color for each piece
var pieColors = [
  "#ff9800",
  "#0fd2cf",
  "#4caf50",
  "#9c27b0",
  "#f44336",
  "#68F505",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    labels: ['Ibrahim', 'Jasim', 'Jisan', 'Teebro', 'Rifat', 'Shofiq'],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>"${i.value}" is winner!</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//initial value
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  //Empty final value
  finalValue.innerHTML = `"Jasim" is winner!`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});