require 'cucumber'
require 'pry'
require 'faker'
require 'yaml'
require 'rubocop'
require "uri"
require "httparty"
require "net/http"

ENVIRONMENT_TYPE ||= ENV['ENVIRONMENT_TYPE']

URL = YAML.load_file(File.expand_path('../../config/environment.yml', __dir__))['environment']['url'][ENVIRONMENT_TYPE]


