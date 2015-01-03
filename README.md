s3-signed-upload
=======================

Please use [meteor-slingshot](https://github.com/CulturalMe/meteor-slingshot) instead. This package is no longer mantained.

Continue at your own peril.

    meteor add jimmiebtlr:s3-signed-upload

S3 Signed Uploads for MeteorJS.

#Server Setup
```
AWS.config.update({
  accessKeyId: "AWS ACCESS KEY",
  secretAccessKey: "AWS SECRET KEY"
});

s3 = new AWS.S3();

s3UploadProfiles = {
  'PROFILE_NAME': {
    'bucket': 'BUCKET NAME',
    'mime': 'ACCEPTED MIME TYPE',
    'expries': EXPIRY_INTEGER
  }
}
```

S3SignedUploadTmp is a collection that tracks all requested uploads, with the intention that you remove the record from the collection after it is confirmed uploaded and actually used in an object.  This portion may be rewritten at some point.

#Client Use

```
var callbackFunction = function(resp){
  // resp.url contains where the newly uploaded file may be downloaded from.
}

uploadFile( 'PROFILE_NAME', fileHandle, callbackFunction );
```

#S3 Setup

## Cors

Setup CORS to allow puts from your domain.


#TODO

Add Progress callbacks
Add Content Length Limitations
