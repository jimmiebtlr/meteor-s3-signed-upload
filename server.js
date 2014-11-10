FileSchema = new SimpleSchema({
  name: {
    type: String
  },
  type: {
    type: String
  },
  size: {
    type: Number,
    min: 0
  }
});

Meteor.methods({
  requestUploads: function(profile, files ) {
    check( profile, String );
    check( files, [FileSchema] );
    var settings = s3UploadProfiles[profile];
    var params = {
        Bucket: settings.bucket,
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
    
    var resp = { files: [] };

    _.each( files, function( file ){
      if( file.type !== settings.mime ){ 
        resp.files.push( {error: "Expected type " + settings.mime } );
      }else{
        params.Key = generateUUID();
        Meteor.wrapAsync(s3.getSignedUrl('putObject', params, putObjFunc));
        resp.files.push(
          {
            name: file.name,
            surl: url,
            bucket: settings.bucket,
            key: params.Key
          }
        );
        var sigRecord = {
          bucket: settings.bucket,
          key: params.key
        }
        S3SignedUploadTmp.insert( sigRecord );
      }
    });
    
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
