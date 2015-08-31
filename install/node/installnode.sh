#!/bin/bash
BASEPATH=$(cd `dirname $0`;pwd)
NODEFILENAME=node-v0.10.40-linux-x64
wget https://nodejs.org/dist/v0.10.40/node-v0.10.40-linux-x64.tar.gz
rm $NODEFILENAME -rf
tar -zxvf $NODEFILENAME.tar.gz 
rm /usr/sbin/node
rm /usr/sbin/npm
sudo ln -s ${BASEPATH}/$NODEFILENAME/bin/node /usr/sbin/node
sudo ln -s ${BASEPATH}/$NODEFILENAME/bin/npm /usr/sbin/npm
