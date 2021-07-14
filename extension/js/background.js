const url = 'http://localhost:8000/products';
const signupUrl = 'http://localhost:8000/user/signup';
const loginUrl = 'http://localhost:8000/user/login';
// const rawData = {
//     fruits: [
//         {
//             name: "Banana",
//             color: "Yellow"
//         },
//         {
//             name: "Apple",
//             color: "Red"
//         },
//         {
//             name: "Watermelon",
//             color: "Green"
//         }
//     ],
//     vegetables: []
// }

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
        if(request.destination === 'login') {
            console.log(request.email + " " + request.password);
            $.ajax({
                url: loginUrl,
                data: request,
                type: 'POST',
                success: function(response) {
                    console.log(('response: ', response));
                    chrome.storage.local.set({
                        token: response.token
                    })
                    sendResponse({status: "success"});
                    
                },
                error: function(response) {
                    console.log('error: ', response)
                    sendResponse({status: "error", response: response});
                },
            })
        } else if(request.destination === 'signup') {
            console.log(request.email + " " + request.username + " " + request.password);
            $.ajax({
                url: signupUrl,
                data: request,
                type: 'POST',
                success: function(response) {
                    console.log(('response: ', response))
                },
                error: function(response) {
                    console.log('error: ', response)
                },
            })
        }
    })
})