import {AppConfig} from '../config/base';
import QueryString from 'query-string';
import {httpPost,httpGet} from './api'
const useCors = true;


export default class SalesmanService {
  constructor () {
          this.resource = 'salesman';
          this.isOnline = window.isOnline;
          this.qs = QueryString;
          document.addEventListener('onlineStatusChange', this.onlineStatusChange.bind(this));
  }
  getOfflinePromisse () {
          return new Promise((resolve, reject) => reject('InternetConnectionOffline'));
      }
  onlineStatusChange () {
    this.isOnline = window.isOnline;
  }

  get preRequest () {
    if (!this.isOnline) {
        //swal('Atenção', 'Parece que você está sem uma conexão ativa com a internet, verifique e volte a tentar nomamente', 'error');
        setTimeout(window.checkOnlineStatus, 100);
        return false;
    }
    return true;
  }
  create (model, headers = {}, query = {}) {
        return new Promise((resolve, reject) => {
            let q = QueryString.stringify(query);
            httpPost(`${this.resource}?${q}`, model, headers)
                .then((response) => {
                    if (response.status === 401) {
                        response.json().then((data) => reject(data));
                    } else if (response.status !== 200) {
                        response.json().then((data) => reject(data));
                        throw new Error(response.message);
                    }
                    response.json().then((data) => resolve(data));
                })
                .catch(err =>console.log(err));
        });
  }
  get (id, dispatch = e => e, headers = {}, query = {}) {
        return new Promise((resolve, reject) => {
            let q = QueryString.stringify(query);
            httpGet(this.resource + '/' + id + '?' + q, headers)
                .then((response) => {
                    if (response.status === 401) {
                        response.json().then((data) => reject(data));
                    } else if (response.status !== 200) {
                        response.json().then((data) => reject(data));
                        throw new Error(response.message);
                    }
                    response
                        .json()
                        .then((res) => resolve(res.data));
                })
                .catch(err => window.checkOnlineStatus().then(r => reject(err)));
        });
    }
    getAll ( headers = {}) {
        return new Promise((resolve, reject) => {
            httpGet(this.resource, headers)
                .then((response) => {
                    if (response.status === 401) {
                        response.json().then((data) => reject(data));
                    } else if (response.status !== 200) {
                        response.json().then((data) => reject(data));
                        throw new Error(response.message);
                    }
                    if (!response.bodyUsed) {
                        response
                            .json()
                            .then((data) => resolve(data));
                    }
                })
                .catch(err => console.log);
        });
    }
    getSales (id_salesman) {
        return new Promise((resolve, reject) => {
            httpGet(this.resource + '/' + id_salesman + '/get-sales')
                .then((response) => {
                    if (response.status === 401) {
                        response.json().then((data) => reject(data));
                    } else if (response.status !== 200) {
                        response.json().then((data) => reject(data));
                        throw new Error(response.message);
                    }
                    response
                        .json()
                        .then((res) => resolve(res.data));
                })
                .catch(err => console.log(err));
        });
    }

}
