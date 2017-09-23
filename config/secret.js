module.exports = {
    database: 'mongodb://muyiwa:Pa$$w0rd@ds129333.mlab.com:29333/shoutout',
    port: 81,
    secretKey: 'Pa$$w0rd',
    
    facebook : {
	appID : '142383519685825',
	appSecret : 'f6bc509d5ff2a989275f7176ceabc585',
	callbackUrl : 'http://localhost:81/login/facebook/callback'
    },

    twitter: {
	apikey : '<your_api_key>',
	apisecret : '<your_api_secret>',
	callbackUrl : 'http://localhost:81/login/twitter/callback'
    },

    googleAuth: {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
}


