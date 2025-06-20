
document.addEventListener("DOMContentLoaded", () => {
const MINT_ADDRESS = 'EHA7yRvzCKaUwykSg3qgELeEYM5fRcsA3VyWnF2yqBLV';
let price = 0.000004;

async function fetchPrice() {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/solana/${MINT_ADDRESS}`);
        const data = await res.json();
        price = parseFloat(data.pair.priceUsd);
        if (!isNaN(price)) {
            document.getElementById("price-box").innerText = `Current Price: $${price.toFixed(6)} per $CAR`;
        } else {
            price = 0.000004;
            document.getElementById("price-box").innerText = "Current Price: $0.000004 per $CAR";
        }
    } catch (e) {
        price = 0.000004;
        document.getElementById("price-box").innerText = "Current Price: $0.000004 per $CAR";
    }
}

function copyContract() {
    const address = document.getElementById("contract-address").innerText;
    navigator.clipboard.writeText(address).then(() => {
        const msg = document.getElementById("copy-confirm");
        msg.style.display = "inline";
        setTimeout(() => {
            msg.style.display = "none";
        }, 3000);
    });
}


  function calculateCAR() {
      if (isNaN(price) || price <= 0) {
          document.getElementById("car-result").innerText = "Fetching price... Please try again.";
          return;
      }

      const carSelect = document.getElementById("car-select");
      if (!carSelect) return;

      const carValue = parseFloat(carSelect.value);
      const needed = Math.ceil(carValue / price).toLocaleString();
      const name = carSelect.selectedOptions[0].text;
      document.getElementById("car-result").innerText = `You need ${needed} $CAR to buy a ${name}.`;
  }

  function checkAffordableCar() {
      if (isNaN(price) || price <= 0) {
          document.getElementById("afford-result").innerText = "Fetching price... Please try again.";
          return;
      }

      const raw = document.getElementById("car-balance").value.replace(/,/g, "");
      const balance = parseFloat(raw || 0);
      const usdValue = balance * price;

      let result = "❗Buy More $CAR!";
      if (usdValue >= 3000000) result = "You can afford a Bugatti Chiron!";
      else if (usdValue >= 450000) result = "You can afford a Lamborghini Aventador!";
      else if (usdValue >= 350000) result = "You can afford a Rolls-Royce Ghost!";
      else if (usdValue >= 310000) result = "You can afford a McLaren 720S!";
      else if (usdValue >= 280000) result = "You can afford a Ferrari 488 GTB!";
      else if (usdValue >= 260000) result = "You can afford a Lamborghini Huracán!";
      else if (usdValue >= 210000) result = "You can afford a Porsche 911 Turbo S!";
      else if (usdValue >= 120000) result = "You can afford a Nissan GT-R!";
      else if (usdValue >= 100000) result = "You can afford a Lexus LC 500!";
      else if (usdValue >= 45000) result = "You can afford a Toyota Supra!";
      document.getElementById("afford-result").innerText = result;
  }

  fetchPrice();

  document.getElementById("prevBtn").onclick = () => {
    currentIndex = (currentIndex - 1 + cars.length) % cars.length;
    updateCarousel();
  };

  document.getElementById("nextBtn").onclick = () => {
    currentIndex = (currentIndex + 1) % cars.length;
    updateCarousel();
  };

  document.getElementById("car-balance").addEventListener("input", () => {
      const input = document.getElementById("car-balance");
      let raw = input.value.replace(/,/g, "").replace(/[^0-9]/g, "");
      let formatted = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let cursorPos = input.selectionStart;
      let diff = formatted.length - input.value.length;

      input.value = formatted;
      input.setSelectionRange(cursorPos + diff, cursorPos + diff);
  });

  window.copyContract = copyContract;
  window.calculateCAR = calculateCAR;
  window.checkAffordableCar = checkAffordableCar;

  const cars = [
  { name: "Toyota Supra", img: "images/car1.jpg" },
  { name: "Lexus LC 500", img: "images/car2.jpg" },
  { name: "Nissan GT-R", img: "images/car3.jpg" },
  { name: "Porsche 911 Turbo S", img: "images/car4.jpg" },
  { name: "Lamborghini Huracán", img: "images/car5.jpg" },
  { name: "Ferrari 488 GTB", img: "images/car6.jpg" },
  { name: "McLaren 720S", img: "images/car7.jpg" },
  { name: "Rolls-Royce Ghost", img: "images/car8.jpg" },
  { name: "Lamborghini Aventador", img: "images/car9.jpg" },
  { name: "Bugatti Chiron", img: "images/car10.jpg" }
];
  let currentIndex = 0;

  function updateCarousel() {
    const img = document.getElementById("carouselImage");
    const name = document.getElementById("carouselName");
    img.src = cars[currentIndex].img;
    name.innerText = cars[currentIndex].name;
  }
});
