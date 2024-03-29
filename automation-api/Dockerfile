ARG RUBY_VERSION=2.6.2
FROM ruby:${RUBY_VERSION}

WORKDIR /automation-api/

COPY . /automation-api/

RUN gem install bundler && bundler i