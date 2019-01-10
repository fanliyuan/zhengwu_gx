#!/bin/sh
PROCESS=`ps -ef|grep nginx|grep -v grep|grep -v PPID|awk '{ print $2}'`
for i in $PROCESS
do
  echo "Kill the $1 process [ $i ]"
  kill -9 $i
done

/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
echo nginx started!

