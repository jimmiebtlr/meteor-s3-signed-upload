Package.describe({
  summary: "S3 signed uploads for meteorjs.",
  version: "0.0.3-rc.1",
  git: "https://github.com/jimmiebtlr/meteor-s3-signed-upload.git"
});

Package.on_use(function(api){
  api.use(['mrt:aws-sdk@0.2.0'],'server');
  api.use(['aldeed:simple-schema@0.7.0']);
  api.export(['uploadFile'],'client');
  api.export(['S3SignedUploadTmp'],'server');

  api.add_files([
    'client.js'
  ], 'client');

  api.add_files([
    'server.js'
  ], 'server');
});
