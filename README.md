meteor-s3-signed-upload
=======================

S3 Signed Uploads for MeteorJS.

#Server Setup
```
AWS.config.update({
  accessKeyId: "AWS ACCESS KEY",
  secretAccessKey: "AWS SECRET KEY"
});

s3 = new AWS.S3();

s3UploadProfiles = {
  'uploadProfile': {
    'bucket': 'BUCKET NAME',
    'mime': 'ACCEPTED MIME TYPE',
    'expries': EXPIRY_INTEGER
  }
}
```

#Client Use

```
var callbackFunction = function(resp){
  console.log("Does something with the server response");
  console.log("File has been uploaded already");
  console.log(resp);
  // this is the url for public get
  consele.log(resp.url);
  // this is the signed url for upload, shouldn't need it though
  console.log(resp.surl);
}

uploadFile( 'uploadProfile', fileHandle, callbackFunction );
```

#TODO
*Add a mechanism to track and remove unneeded files.
*Fix the client code timout portion.
