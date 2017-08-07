module.exports = {
    database: 'mongodb://shiko:Pa$$w0rd@ds129333.mlab.com:29333/shoutout',
    port: 81,
    secretKey: 'Pa$$w0rd',
    
    facebook : {
	appID : '<your_app_id>',
	appSecret : '<your_app_secret>',
	callbackUrl : 'http://localhost:3000/login/facebook/callback'
    },

    twitter: {
	apikey : '<your_api_key>',
	apisecret : '<your_api_secret>',
	callbackUrl : 'http://localhost:3000/login/twitter/callback'
    },

    googleAuth: {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
}


