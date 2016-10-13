var path = require('path'),    
       rootPath = path.normalize(__dirname + '/..'),    
       env = process.env.NODE_ENV || 'development';

var config = {  
     
       development: {    
                   root: rootPath,    
                   app: {      name: 'Chirps'    },    
                   port: 5000,  },  
       
       
        production: {    
                     root: rootPath,    
                     app: {      name: 'Chirps'    },    
                      port: 80,  },

              
               test: {
                     root: rootPath,
                      app: {      name: 'Chirps'    },
                      port: 5000, }, 
 };

module.exports = config[env];
