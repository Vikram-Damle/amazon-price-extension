const creds = {
    username : 'user123',
    password : 'pass123',
}

module.exports = {
    url: `mongodb+srv://${creds.username}:${creds.password}@cluster0.xukwz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    randomString: "abcdefghij0123456789"
}