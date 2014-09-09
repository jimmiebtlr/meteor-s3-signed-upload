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

#Client Use

```
var callbackFunction = function(resp){
  // resp.url contains where the newly uploaded file may be downloaded from.
}

uploadFile( 'uploadProfile', fileHandle, callbackFunction );
```

#TODO
* Add a mechanism to track and remove unneeded files.
* Fix the client code timout portion.

Pull requests welcome.
