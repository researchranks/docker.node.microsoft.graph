FROM mhart/alpine-node:6.4.0
MAINTAINER cntmedia <cnt@cntmedia.com>

# create app directories
RUN mkdir -p /var/www/html/app
WORKDIR /var/www/html/app

# Install img dependencies from: https://pkgs.alpinelinux.org/packages
RUN apk update
RUN apk add jq

# bundle app source
COPY . /var/www/html/app

# install app dependencies
COPY ./app/package.json /var/www/html/app/
WORKDIR /var/www/html/app/
RUN npm install --global --save supervisor
#RUN npm config set registry http://registry.npmjs.org/ && npm install

# install dependencies one at a time instead of flooding the cpu and memory
#RUN /usr/bin/node \
#  --max_semi_space_size=1 \
#  --max_old_space_size=198 \
#  --max_executable_size=148 \
#  /usr/bin/npm install
#

# Add installed binaries to env
ENV PATH /var/www/html/app/node_modules/.bin:$PATH

# RUN ln -s /usr/local/lib/node_modules /usr/local/lib/node
#RUN npm install express
#RUN npm install --global --save http-server

WORKDIR /var/www/html/app/public
#RUN cd /var/www/html/app/public
#CMD ["http-server"]
CMD [ "npm", "start" ]
