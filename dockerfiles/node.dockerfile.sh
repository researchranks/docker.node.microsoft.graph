FROM mhart/alpine-node:6.4.0
MAINTAINER cntmedia <cnt@cntmedia.com>

# create app directories
RUN mkdir -p /var/www/html/app
WORKDIR /var/www/html/app



COPY ./app/package.json /tmp/package.json


RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /var/www/html/node_modules/



## Add installed binaries to env
ENV PATH /var/www/html/node_modules/.bin:$PATH




## bundle app source
#COPY . /var/www/html/app


#
#
#COPY ./app/package.json /var/www/html/app/package.json
#
#RUN npm install
#
#
## From here we load our application's code in, therefore the previous docker
## "layer" thats been cached will be used if possiblle
#
## bundle app source
#COPY . /var/www/html/app
#
#
#CMD ["npm","start"]
#

















# install app dependencies
# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
#COPY ./app/package.json /tmp/package.json
#RUN cd /tmp && npm install
#RUN cp -a /tmp/node_modules /var/www/html/app/



#RUN npm install && npm install --global --save supervisor

#RUN npm config set registry http://registry.npmjs.org/ && npm install

# install dependencies one at a time instead of flooding the cpu and memory
#RUN /usr/bin/node \
#  --max_semi_space_size=1 \
#  --max_old_space_size=198 \
#  --max_executable_size=148 \
#  /usr/bin/npm install




# RUN ln -s /usr/local/lib/node_modules /usr/local/lib/node
#RUN npm install express
#RUN npm install --global --save http-server

#RUN cd /var/www/html/app/public
#CMD ["http-server"]
CMD [ "npm", "start" ]
