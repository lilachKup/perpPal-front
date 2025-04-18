const express = require('express');
const session = require('express-session');
const path = require('path');
const { Issuer, generators } = require('openid-client')

const app = express();
const PORT = process.env.PORT || 3000;

// הגדרת מנוע תצוגה
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../../views')); // ← מתאים למבנה שלך

// הגדרת סשן
app.use(session({
    secret: 'super-secret-key-12345',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false // ⚠️ True אם ב-HTTPS
    }
}));

// אתחול Cognito Client
let client;
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.us-east-1.amazonaws.com/us-east-1_O8ggAWzoZ');
    client = new issuer.Client({
        client_id: 'ehfkh00ld0q6p3641hnq3mseq',
        client_secret: '19it1a10ccfskejhv75hrjjf7n11s9m0sboj6gb49uhjgk0mg5r7',
        redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net/callback'],
        response_types: ['code']
    });
}
initializeClient().catch(console.error);

// Middleware לבדיקה אם מחובר
const checkAuth = (req, res, next) => {
    req.isAuthenticated = !!req.session.userInfo;
    next();
};

// דף הבית
app.get('/', checkAuth, (req, res) => {
    res.render('home', {
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo || {}
    });
});

// התחברות
app.get('/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'openid email',
        state,
        nonce
    });

    res.redirect(authUrl);
});

// חזרה מהתחברות
app.get('/callback', async (req, res) => {
    try {
        const params = client.callbackParams(req);

        const tokenSet = await client.callback(
            'https://d84l1y8p4kdic.cloudfront.net/callback',
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );

        const userInfo = await client.userinfo(tokenSet.access_token);
        req.session.userInfo = userInfo;

        res.redirect('/');
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('/');
    }
});

// יציאה
app.get('/logout', (req, res) => {
    req.session.destroy();

    const logoutUrl = `https://prep-pal.auth.us-east-1.amazoncognito.com/logout?client_id=ehfkh00ld0q6p3641hnq3mseq&logout_uri=https://d84l1y8p4kdic.cloudfront.net`;
    res.redirect(logoutUrl);
});

// הרצת השרת
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
