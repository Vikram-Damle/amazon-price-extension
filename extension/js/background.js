const url = 'http://localhost:8000/products'
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

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Extension!");
    // sendData()
    // $.ajax({
    //     url: url,
    //     data: JSON.stringify(rawData),
    //     type: 'POST',
    //     cache: 'no-cache',
    //     success: (response) => {
    //         console.log(('response: ', response))
    //     },
    //     error: (response) => {
    //         console.log('error: ', response)
    //     },
    // })

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(JSON.stringify(sender) + ": " + request.username + " " + request.password)
    })
})