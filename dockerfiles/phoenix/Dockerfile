FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y openssl wget git make inotify-tools

ARG ELIXIR_VERSION=1.4.5
ENV ELIXIR_VERSION $ELIXIR_VERSION

ARG PHOENIX_VERSION=1.2.1
ENV PHOENIX_VERSION $PHOENIX_VERSION

ARG WORKDIR=/usr/local/src/phoenix/app/
ENV WORKDIR $WORKDIR

ARG APPLICATION=./application
ENV APPLICATION $APPLICATION

# Elixir requires UTF-8
RUN locale-gen ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8


# install Erlang
RUN wget http://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb \
 && dpkg -i erlang-solutions_1.0_all.deb \
 && apt-get update \
 && apt-get install erlang -y \
 && apt-get install erlang-base-hipe -y \
 && rm erlang-solutions_1.0_all.deb

# install Elixir
RUN git clone https://github.com/elixir-lang/elixir.git \
 && cd elixir \
 && git checkout v$ELIXIR_VERSION \
 && make

ENV PATH $PATH:/elixir/bin

# install Phoenix from source with some previous requirements
RUN git clone https://github.com/phoenixframework/phoenix.git \
 && cd phoenix && git checkout v$PHOENIX_VERSION \
 && mix local.hex --force && mix local.rebar --force \
 && mix do deps.get, compile \
 && wget https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez \
 && mix archive.install phoenix_new.ez --force

# install node:latest with yarn
RUN apt-get install -y nodejs npm && \
    npm cache clean && npm i n -g && \
    n stable && ln -sf /usr/local/bin/node usr/bin/node && \
    apt-get purge -y nodejs npm
RUN apt-get install -y curl apt-transport-https && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

WORKDIR $WORKDIR

ARG PHOENIX_APP_NAME=phoenix_app
ENV PHOENIX_APP_NAME $PHOENIX_APP_NAME

RUN mix phoenix.new $PHOENIX_APP_NAME --database postgres
COPY $APPLICATON $WORKDIR$PHOENIX_APP_NAME

WORKDIR $WORKDIR$PHOENIX_APP_NAME
