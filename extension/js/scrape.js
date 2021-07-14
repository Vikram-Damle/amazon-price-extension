window.alert("Testing Scraper");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    if(request.destination === 'track current') {
        const href = new URL(window.location.href);
        
        
        sendResponse({
            name: 'testName',
            url: 'testUrl',
            price: 109
        })
        return true;

    }

    return true;
})