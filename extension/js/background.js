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

const sendData = () => {
    // const xhttp = new XMLHttpRequest()
    // xhttp.open('POST', 'http://localhost:8000/products', true)
    // xhttp.send(jsonData)
    
    // const jsonData = JSON.stringify(rawData);
    

    const postData = async (url = '', data = {}) => {
        const resp = []
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'omit',
            // headers: {
            //     // 'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded'
            //     // 'Content-Type': 'text/plain'
            // },
            body: JSON.stringify(data)
        })
        // .then((response) => {
        //     console.log(response)
        //     return response.body.getReader()
        // }).then((reader) => {
        //     reader.read().then(({done, value}) => {
        //         if(done) {
        //             reader.close()
        //             return
        //         }
        //         resp.push(value)
        //     })
        // })

        console.log(response.headers)
        return resp
    }
        
    postData(url, rawData)
    .then((data) => {
        console.log(data)
    })

}


chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Extension!");
    // sendData()
    $.ajax({
        url: url,
        data: JSON.stringify(rawData),
        type: 'POST',
        success: (response) => {
            console.log(('response: ', response))
        },
        error: (response) => {
            console.log('error: ', response)
        }
    })

})