'use strict';
var http = require('http');
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var spotify = require('./spotify');
var nprplaylist = require('./nprplaylist');
var PORT = 8888;

// TODO:
// - Authenticate user
// - Ask for date
// - Get WYEP playlist for that date
// - Get Spotify tracks
// - Create playlist with those tracks
// - Feedback UI - which songs couldn't be found?
