const url = 'http://localhost:8000/products';
const signupUrl = 'http://localhost:8000/user/signup';
const loginUrl = 'http://localhost:8000/user/login';

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Extension!");

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
                    if(response.statusCode == 500) {
                        sendResponse({
                            status: 'Invalid Token',
                            action: 'Relogin'
                        })
                    } else if(response.statusCode == 401) {
                        sendResponse({
                            status: 'Auth Error',
                            action: 'Relogin'
                        })
                    } else if(response.status == 400) {
                        sendResponse({
                            status: 'Invalid Credentials',
                            action: 'Reenter Credentials'
                        })
                    } else {
                        sendResponse({status: "error", response: response});
                    }
                },
            })
            return true;
        } else if(request.destination === 'signup') {
            console.log(request.email + " " + request.username + " " + request.password);
            $.ajax({
                url: signupUrl,
                data: request,
                type: 'POST',
                success: function(response) {
                    console.log(('response: ', response))
                    chrome.storage.local.set({
                        token: response.token
                    })
                    sendResponse({status: "success"})
                },
                error: function(response) {
                    console.log('error: ', response)
                    if(response.statusCode === 500) {
                        sendResponse({
                            status: 'Database Error',
                            action: 'Retry'
                        })
                    } else if(response.status === 400) {
                        if(response.message === "User Already Exists") {
                            sendResponse({
                                status: 'Duplicate User',
                                action: 'Redirect Login'
                            }) 
                        } else {
                            sendResponse({
                                status: 'Invalid Credentials',
                                errors: response.responseJSON.errors,
                                action: 'Reenter Creds'
                            })  
                        }
                    } else {
                        sendResponse({status: "error", response: response});
                    }
                },
            })
        }
        // sendResponse({test: 'testing sendResponse'})
        return true;
    })
})