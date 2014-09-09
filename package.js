Package.describe({
  summary: "S3 signed uploads for meteorjs.",
  version: "0.0.1",
  git: "https://github.com/jimmiebtlr/meteor-blog.git"
});

Package.on_use(function(api){
  api.use(['aws-sdk'], 'server');
  api.use(['simple-schema'], 'server');
  api.export(['uploadFile'],'client');
  api.export(['S3SignedUploadTmp'],'server');

  api.add_files([
    'client.js'
  ], 'client');

  api.add_files([
    'server.js'
  ], 'server');
});
