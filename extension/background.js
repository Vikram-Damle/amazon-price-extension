// console.log("Hello World!");

const sendData = () => {
    // const xhttp = new XMLHttpRequest()
    // xhttp.open('POST', 'http://localhost:8000/products', true)
    // xhttp.send(jsonData)
    

    const rawData = {
        fruits: [
            {
                name: "Banana",
                color: "Yellow"
            },
            {
                name: "Apple",
                color: "Red"
            },
            {
                name: "Watermelon",
                color: "Green"
            }
        ],
        vegetables: []
    }
    
    const jsonData = JSON.stringify(rawData);
        
}


chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Extension!");
    sendData()

})