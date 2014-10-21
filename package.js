Package.describe({
  summary: "Client side uploads for meteor/s3 using signed uploads for meteorjs.",
  version: "0.1.6",
  git: "https://github.com/jimmiebtlr/meteor-s3-signed-upload.git"
});

Package.on_use(function(api){
  api.use(['mrt:aws-sdk@0.2.0'],'server');
  api.use(['aldeed:simple-schema@1.0.3']);
  api.export(['uploadFile'],'client');
  api.export(['S3SignedUploadTmp'],'server');

  api.add_files([
    'client.js'
  ], 'client');

  api.add_files([
    'server.js'
  ], 'server');
});
