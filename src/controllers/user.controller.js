const httpStatus = require("http-status");
const QRCode = require('qrcode')
const hashing = require('../utils/Hashfile');
const fs = require("fs");
const { upload } = require("../utils/upload");
const tesseract = require("tesseract.js");


class userControllerClass {

    homePage = ((req, res) => {
        res.render('index', {
            Qrcode: '',
        })
    });

    get_encryption = ((req, res) => {
        res.render('encryption', {
            encrypted: '',
            decrypted: ' '
        })
    });

    get_imagetotxt = ((req, res) => {
        res.render('ocr',{data:""})
    });

    get_starpartten = ((req, res) => {
        res.render('starpatten')
    });

    get_alternatebg = ((req, res) => {
        res.render('alternatebackground')
    });

    get_readlanguage = ((req, res) => {
        function readFilePromise(fileName) {
            return new Promise(function (resolve, reject) {
                fs.readFile(fileName,  function (err, data) {
                    if (err) { reject(err) } else {
                        resolve( JSON.parse(data))
                    }
                })
            })
        }
        Promise.all([readFilePromise("json/hindi_file.json"), readFilePromise("json/english_file.json")]).then(function (out) {
            res.render('readlanguage',{
                data:out
            });
        });
    });



    get_fileupload = ((req, res) => {
        res.render('fileupload',{
            filename:""
        })
    });


    // ------------------------------------------------
    post_genrateQr = ((req, res) => {
        const searchParam = `https://www.google.com/search?q=${req.body.searchparm}`;
        // console.log(searchParam);
        QRCode.toDataURL(searchParam, (err, src) => {
            res.render('index', {
                Qrcode: src,
            })
        })

    });

    post_encryption = ((req, res) => {

        const encryptvalue = hashing.encrypt(JSON.stringify(req.body));
        const decryptvalue = hashing.decrypt(encryptvalue);
        res.render('encryption', {
            encrypted: encryptvalue,
            decrypted: JSON.stringify(decryptvalue)
        })

    });

    post_fileupload = async(req, res) => {
        res.render('fileupload',{
            filename: req.file.filename
        })
    };


    post_imagetotxt = async(req, res) => {   
        tesseract.recognize(req.file.path,'eng',{logger : e=>console.log(e , 'in')}).then((out)=>{
            res.render('ocr',{
                data:out.data.text
            })
        })
    };



}

const userController = new userControllerClass();
module.exports = userController;
