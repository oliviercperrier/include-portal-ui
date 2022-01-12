FROM nginx:1.21.4
RUN rm /etc/nginx/conf.d/default.conf
COPY qa.crt /etc/nginx/qa.crt
COPY qa.key /etc/nginx/qa.key
COPY nginx-qa.conf /etc/nginx/conf.d/default.conf