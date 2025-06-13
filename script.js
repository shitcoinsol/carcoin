
async function getCarPrice() {
    try {
        const res = await fetch("https://solana-gateway.moralis.io/token/mainnet/토큰주소입력/price", {
            headers: {
                "X-API-Key": ""
            }
        });
        const data = await res.json();
        let price = 0.000004;
        if (data && typeof data.usdPrice === "number") {
            price = data.usdPrice;
        }
        window.CAR_PRICE = price;
        document.getElementById("price").innerText = `$${price.toFixed(6)} per $CAR`;
    } catch (err) {
        console.error("가격 불러오기 실패:", err);
        const fallbackPrice = 0.000004;
        window.CAR_PRICE = fallbackPrice;
        document.getElementById("price").innerText = "$0.000004 per $CAR";
    }
}

window.onload = async () => {
    await getCarPrice();
    setInterval(getCarPrice, 15000);
};

function copyContract() {
    const text = "soon";
    navigator.clipboard.writeText(text).then(() => {
        const msg = document.getElementById("copy-msg");
        msg.style.display = "inline";
        setTimeout(() => msg.style.display = "none", 3000);
    });
}

const carPrices = {
    "Porsche 911 Carrera": 120000,
    "Chevrolet Corvette C8": 75000,
    "Nissan GT-R": 115000,
    "Audi R8 V10": 160000,
    "BMW M8 Competition": 135000,
    "Mercedes-AMG GT": 140000,
    "Jaguar F-Type R": 115000,
    "Maserati GranTurismo": 175000,
    "Lotus Emira": 100000,
    "Toyota Supra GR": 60000,
    "Ford Mustang GT": 50000,
    "Dodge Challenger SRT": 70000,
    "Lexus LC 500": 100000,
    "Aston Martin Vantage": 155000,
    "McLaren Artura": 237000
};

function calculateCAR() {
    const selected = document.getElementById("car-select").value;
    const priceUSD = carPrices[selected];
    const carPrice = window.CAR_PRICE || 0.000004;
    const needed = Math.ceil(priceUSD / carPrice).toLocaleString();
    document.getElementById("car-needed-output").innerText =
        `You need ${needed} $CAR to buy a ${selected}.`;
}

function formatInput(input) {
    let value = input.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    if (value) {
        input.value = parseInt(value).toLocaleString();
    } else {
        input.value = '';
    }
}

function checkAffordable() {
    const value = document.getElementById("car-holding").value.replace(/,/g, '');
    const carAmount = parseInt(value);
    const carPrice = window.CAR_PRICE || 0.000004;
    const usdValue = carAmount * carPrice;

    let car = null;
    if (usdValue >= 237000) car = "McLaren Artura"; else 
    if (usdValue >= 175000) car = "Maserati GranTurismo"; else 
    if (usdValue >= 160000) car = "Audi R8 V10"; else 
    if (usdValue >= 155000) car = "Aston Martin Vantage"; else 
    if (usdValue >= 140000) car = "Mercedes-AMG GT"; else 
    if (usdValue >= 135000) car = "BMW M8 Competition"; else 
    if (usdValue >= 120000) car = "Porsche 911 Carrera"; else 
    if (usdValue >= 115000) car = "Nissan GT-R"; else 
    if (usdValue >= 115000) car = "Jaguar F-Type R"; else 
    if (usdValue >= 100000) car = "Lexus LC 500"; else 
    if (usdValue >= 100000) car = "Lotus Emira"; else 
    if (usdValue >= 75000) car = "Chevrolet Corvette C8"; else 
    if (usdValue >= 70000) car = "Dodge Challenger SRT"; else 
    if (usdValue >= 60000) car = "Toyota Supra GR"; else 
    if (usdValue >= 50000) car = "Ford Mustang GT";

    const output = document.getElementById("afford-result");
    if (car) {
        output.innerHTML = `🚗 You can afford a ${car}!`;
    } else {
        output.innerHTML = "❗Buy More $CAR!";
    }
}
