/**
 * Application API interaction.
 * @author : Bala
 * File Name : entitiesApi.js
 * Path : /entities
 * Created Date : 15th Nov 2017
 */

import {polyfill} from "es6-promise";
import "isomorphic-fetch";
import config from '../config';
const entitiesApi = (url,headers) => {
  return fetch(url,headers).then(function(response) {
    return response;
  })
}

export default entitiesApi;