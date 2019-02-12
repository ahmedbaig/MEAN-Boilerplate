'use strict';

// Nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'unionliveappdev@gmail.com', // generated ethereal user
        pass: '123456abc@'  // generated ethereal password
    }
});

// random token generator
const UIDGenerator = require('uid-generator');

const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'unionliveapp', 
    api_key: '625796612882882', 
    api_secret: 'JpPpeyaHqa9_Ti-jU_Y4uYSzs_o' 
});

  
  


exports.sendEmail = function(to,subject,html){
    return new Promise(function(resolve,reject){
        
        
        let mailOptions = {
            from: 'smtp.gmail.com', // sender address
            to: to, // list of receivers
            subject: subject,
            html: html
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                //console.log(error);
                reject(error);
            }else{
                resolve();
            }           
        });
          
    })
}


exports.generateRandomToken = function(){
    
    const uidgen = new UIDGenerator();
    return uidgen.generateSync();

}

exports.uploadFileToCloudinary = function(file){
    return new Promise(function(resolve,reject){
        if( file ){
            cloudinary.uploader.upload_stream(function(result) { 
            
                if(result.error){
                    reject(result.error);
                }else{
                    resolve(result);
                }
    
            }).end(file)
        }else{
            resolve();
        }
    })
}

