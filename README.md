s3-signed-upload
=======================

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
<CORSRule>
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>GET</AllowedMethod>
  <AllowedMethod>PUT</AllowedMethod>
</CORSRule>

Note: It's probably best to set allowed origin to your domain, as well as restrict allowed headers for get and put separatly.
