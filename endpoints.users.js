
// upload images : https://www.youtube.com/watch?v=GyzC-30Bqfc&t=6s
// front end react native : https://github.com/byprogrammers/LCRN15-food-recipe-app-starter
// modules
const express = require('express') , bodyParser = require('body-parser') , cors = require('cors') , cookieParser = require('cookie-parser') ;
const rateLimit = require('express-rate-limit') , session = require('express-session') ;
const mongodbStore = require('connect-mongodb-session')(session);

// define env
require('dotenv').config({path : './config_server/.env'});

// time management
const moment = require('moment');

// define app 
const app = express();

const {maxValidityConnection} = require('./utils/jwt.utils');

// methods
const { getURLRequestHTTP } = require('./middleware/httpRequest');
const {checkConnectionUserAppMobile} = require('./middleware/auth.user.middleware');
const { connectionRetryMongodb } = require('./mongo.models.connect/connect.mongodb');

// define routes
const userRouter = require('./routes/user-management.routes') , foodApiRoutes = require('./routes/food.routes');
const deliveryRoutes = require('./routes/user-delivery.routes') , postReceiptsRoutes = require('./routes/post-receipts.routes');
// limit debit request
const limiter = rateLimit({

	windowMs: 15* 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    
});

// define store session mongodb

const store_session = new mongodbStore({

    uri : `mongodb://${process.env.ADDRESS}:${process.env.MONGO_PORT}/${process.env.NAME_DB_SESSION}`,
    collection : process.env.NAME_COLLECTION_SESSION
});

// event error store session
store_session.on('error' , (error) =>{

    console.log(error);
});

// connect db 
connectionRetryMongodb();


//cors options
const corsOptions = {
    origin : "*", // 
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
};

app

.use(cors(corsOptions))

.set('trust proxy' , 1)

.use(getURLRequestHTTP)

.use(bodyParser.json())

.use(bodyParser.urlencoded({
    extended : true 
}))
.use(cookieParser())

// config session
.use(session ({
    store : store_session,
    secret : process.env.SECRET_SESSION,
    cookie : {
        maxAge : maxValidityConnection,
        resave: true,
        saveUninitialized: true,
        httpOnly : true,
        secure : false
    },
    
}))
// https://www.youtube.com/watch?v=xsFHKCcV2rg
//https://leclaireur.fnac.com/article/19650-mi-air-charge-xiaomi-promet-de-recharger-sans-fil-et-a-distance-vos-appareils/
// check connection user app mobile 

.use('/user-connect-server' , limiter , checkConnectionUserAppMobile , (req , res) =>{

        if (req.session.user !== null) {
            let user_current = req.session.user;
            console.log(`Utilisateur ${user_current.pseudo} connecté`);
            // response at client
            res.status(200).json({
                status : true ,
                message : 'Connection successfully',
                data : user_current,
                time : moment(new Date()).format
            });
            // set session 
            req.session.statusCode = 200;
            // log session
            console.log(req.session);
            user_current = null;
        }
        else{

            res.status(200).json({
                status : false ,
                message : 'go sign ',
                time : moment(new Date()).format()
            });
            // set session
            req.session.statusCode= 200;
            // log session
            console.log(req.session);

        }
        
})

// implements user routes 

.use('/user-management' ,limiter ,  userRouter)

// implements user api 


// implements food api 

.use('/food-api' , limiter , foodApiRoutes)

// implements delivery routes : pour la validation de la livraison

.use('/delivery-management' , limiter , deliveryRoutes)

// post receipts routes 

.use('/post-receipts-management' , limiter , postReceiptsRoutes)

// start server
.listen(process.env.PORT , () => {

    console.log(`Server started on the port ${process.env.PORT}`);
});

