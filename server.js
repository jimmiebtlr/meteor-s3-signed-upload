Meteor.methods({
  requestUpload: function(profile, mime, size) {
    check( profile, String );
    check( mime, String );
    check( size, Number );
    var settings = s3UploadProfiles[profile];
    if( mime !== settings.mime ){ return { error: "Expected type " + settings.mime } };
    if( size > settings.maxSize ){ return { error: "File to large, max size " + settings.maxSize } };
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

    Meteor.wrapAsync(s3.getSignedUrl('putObject', params, putObjFunc));
    
    resp = {
      surl: url,
      Bucket: params.Bucket,
      Key: params.Key
    }
    sigRecord = {
      bucket: settings.bucket,
      key: params.Key
    }
    S3SignedUploadTmp.insert( sigRecord );
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

S3SignedUploadTmpSchema = new SimpleSchema({
  bucket: {
    type: String
  },
  key: {
    type: String
  },
  signedDateTime: {
    type: Date,
    autoValue: function(){ return (new Date()) }
  },
  ownerId: {
    type: String,
    autoValue: function(){ return Meteor.userId() }
  }
});

S3SignedUploadTmp = new Meteor.Collection("S3SignedUploadTmpSchema", { schema: S3SignedUploadTmpSchema });
