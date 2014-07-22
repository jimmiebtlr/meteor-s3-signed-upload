Meteor.methods({
  requestUpload: function(profile, mime) {
    var settings = s3UploadProfiles[profile];
    console.log( settings.mime);
    console.log(settings.bucket);
    console.log( settings.expire);
    var params = {
        Bucket: settings.bucket,
        Key: generateUUID(),
        ContentType: settings.mime,
        Expires: settings.expires
    };
    
    var url;
    var putObjFunc = function(err, surl) {
        if (!err) {
            url = surl;
        } else {
            console.log("Error signing url " + err);
        }
    }

    Meteor._wrapAsync(s3.getSignedUrl('putObject', params, putObjFunc));
    var getUrl = "https://" + params.Bucket + ".s3.amazonaws.com/" + encodeURIComponent(params.Key)
    
    resp = {
      surl: url,
      url: getUrl
    }
    return resp;
  }
});

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};

