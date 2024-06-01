    const express= require('express')
    const mongoose= require('mongoose')
    const session = require('express-session')
    const MongoStore= require('connect-mongo')
    const route=require('./routes/user')
    const cors=require('cors')
    const app=express()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    const corsOptions = {
        origin: 'http://localhost:3000', // frontend server
        credentials: true
    };
    app.use(cors(corsOptions))
    
    const dbString= 'mongodb+srv://dandotiyayash73:wCAMl28PcrmfhctM@cluster0.ntsszyk.mongodb.net/session?retryWrites=true&w=majority&appName=Cluster0'

    mongoose.connect(dbString).then(()=>{
        console.log('Database connected successfully')
        app.listen(5000)}
    ).catch((err)=>{console.log('something unexpected occured')})
    // const connection=mongoose.createConnection(dbString);


    const sessionStore= new MongoStore({
        mongoUrl: dbString,
        collectionName: 'sessions'
    })

    // connection.on('connected', () => {
    //     console.log('Database connected successfully');
    // });

    // connection.on('error', (err) => {
    //     console.error('Database connection error:', err);
    // });


    app.use(session({
        secret: 'some secret',
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            maxAge: 1000*10*1
        }
    }))


    app.use( '/users', route)

