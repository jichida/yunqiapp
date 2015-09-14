rm -fr yunqiapp
rm -fr yunqiadminapp

unzip yunqiadminapp.zip
unzip yunqiapp.zip

cd yunqiapp
rm -fr bundle
rm -f yunqiapp.tar.gz
meteor build .
tar -zxf yunqiapp.tar.gz
cd bundle/programs/server 
npm install
cd ../../../

cd ..
cd yunqiadminapp
rm -fr bundle
rm -f yunqiadminapp.tar.gz
meteor build .
tar -zxf yunqiadminapp.tar.gz
cd bundle/programs/server 
npm install
cd ../../../