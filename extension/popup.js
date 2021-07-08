const sendData = () => {
    const xhttp = new XMLHttpRequest()
    
    xhttp.open('POST', 'localhost:8000/products', true)
    const rawData = {
        cats: [
            {
                name: "Koala",
                color: "Black"
            },
            {
                name: "Ninja",
                color: "Black"
            },
            {
                name: "Sheeli",
                color: "Silver"
            }
        ],
        dogs: []
    }
    
    const jsonData = JSON.stringify(rawData);
    console.log("sending Request");
    xhttp.send(jsonData)
    
}

document.getElementById("sendDataButton").addEventListener('click', sendData)
    