const url = 'http://localhost:8000/products';
const signupUrl = 'http://localhost:8000/user/signup';
const loginUrl = 'http://localhost:8000/user/login';
const trackUrl = 'http://localhost:8000/user/track'

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed Extension!");

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if(request.destination === 'login') {
            console.log(request.email + " " + request.password);
            handleLogin(request, sendResponse);

            return true;
        } else if(request.destination === 'signup') {
            console.log(request.email + " " + request.username + " " + request.password);
            handleSignup(request, sendResponse)

            return true;
        } else if(request.destination === 'track current') {
            chrome.storage.local.get('token', (result) => {
                handleTrackCurrent(request, sendResponse, result.token);
            })

            return true;
        }
        return true;
    })
})

const handleSignup = (request, sendResponse) => {
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
};

const handleLogin = (request, sendResponse) => {
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
    });
};

const handleTrackCurrent = (request, sendResponse, token) => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const tab = tabs[0];
        const tabUrl = new URL(tab.url);
        console.log(tabUrl);
        if(tabUrl.hostname === 'www.amazon.in') {
            const path = tabUrl.pathname.split('/');
            if(path.includes('dp')) {
                chrome.tabs.sendMessage(tab.id, {
                    destination: 'track current'
                }, (response) => {
                    const {name, url, price} = response;
                    $.ajax({
                        url: trackUrl,
                        data: {name, url, price},
                        type: 'POST',
                        headers: {token},
                        success: (response) => {
                            console.log(('tracking success: ', response))
                            // sendResponse({status: "success"})
                        },
                        error: (response) => {
                            console.log(('tracking error: ', response))
                            // sendResponse({status: "error"})
                            
                        }
                    });
                });
                
                return true;
            }
        }

        console.log('Wrong URL');
        
        sendResponse({
            status: 'Wrong url',
            action: 'Change Page'
        });
        return true;
    });
    return true;
}