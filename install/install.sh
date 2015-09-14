#!/bin/bash
BASEPATH=$(cd `dirname $0`;pwd)

sudo apt-get update
sudo apt-get install dos2unix  -y
sudo apt-get install nginx -y

apt-get install curl
curl https://install.meteor.com/ | sh

apt-get install mongodb -y

chmod +x node/installnode.sh
dos2unix node/installnode.sh
cd node
./installnode.sh
cd ..

mv /etc/nginx/nginx.conf /etc/nginx/nginx_bk.conf
cp nginx/nginx.conf /etc/nginx/nginx.conf
/etc/init.d/nginx restart
apt-get install unzip  -y

cd ../yunqiapp
meteor build .
tar -zxf yunqiapp.tar.gz
cd bundle/programs/server 
npm install
cd ../../../

cd ../yunqiadminapp
meteor build .
tar -zxf yunqiadminapp.tar.gz
cd bundle/programs/server 
npm install
cd ../../../

cd ${BASEPATH}

chmod +x ./startyunqi.sh
dos2unix ./startyunqi.sh

cp ./startyunqi.sh /etc/init.d/startyunqi.sh
WEBPATH=`echo $BASEPATH`
WEBPATHOK=`echo $WEBPATH|sed 's/\\//\\\\\\//g'`
echo $WEBPATHOK
sed -i "s/\[curpath\]/$WEBPATHOK/g" '/etc/init.d/startyunqi.sh'

cd /etc/init.d
sudo update-rc.d startyunqi.sh defaults 95