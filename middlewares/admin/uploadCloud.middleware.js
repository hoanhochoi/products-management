const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


// clouddinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, // các biến ở file env là toàn cục dùng khắp nơi chỉ cần gọi là process.env.tên-biến
    api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
});
// end clouddinary

module.exports.upload = (req, res, next)=> {
    if (req.file) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result.secure_url);
            req.body[req.file.fieldname] = result.secure_url;
            // req.file.fieldname kiểu này sẽ linh động hơn là bên views có name là thumbnail sẽ tương thích được và các name khác  
        next();
        }

        upload(req);
    }else{
        next();
    }


}