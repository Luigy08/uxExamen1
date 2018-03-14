webpackJsonp([0],{

/***/ 143:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 143;

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, alertCtrl, actionSheetCtrl, afDatabase, afAuth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.message = '';
        this.messageRef = afDatabase.list('messages', function (ref) { return ref.orderByChild('order'); });
        this.messages = this.messageRef.valueChanges();
        this.userRef = afDatabase.list('users');
        this.users = this.userRef.valueChanges();
        afAuth.authState.subscribe(function (user) {
            if (!user) {
                _this.currentUser = null;
                return;
            }
            _this.currentUser = { uid: user.uid, photoURL: user.photoURL, displayName: user.displayName };
            _this.countryRef = __WEBPACK_IMPORTED_MODULE_4_firebase_app__["database"]().ref('/users');
            _this.countryRef.on('value', function (userlist) {
                var usuarios = [];
                userlist.forEach(function (usuario) {
                    usuarios.push(usuario.val());
                    return false;
                });
                _this.userlist = usuarios;
                _this.loadeduserlist = usuarios;
            });
        });
    }
    HomePage.prototype.initializeItems = function () {
        this.userlist = this.loadeduserlist;
    };
    HomePage.prototype.getItems = function (ev) {
        this.initializeItems();
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.userlist = this.userlist.filter(function (item) {
                return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage.prototype.like = function (id, likes, orders) {
        this.messageRef.update(id, {
            like: likes + 1,
            order: orders - 1
        });
    };
    HomePage.prototype.dislike = function (id, dislikes) {
        this.messageRef.update(id, {
            dislike: dislikes + 1,
        });
    };
    HomePage.prototype.addMessage = function () {
        var newMessageRef = this.messageRef.push({});
        newMessageRef.set({
            id: newMessageRef.key,
            title: this.message,
            like: 0,
            dislike: 0,
            order: 0,
            uid: this.currentUser.uid,
            uPhoto: this.currentUser.photoURL,
            displayName: this.currentUser.displayName,
            estado: 0
        });
        this.message = '';
    };
    HomePage.prototype.privado = function (messageId) {
        this.messageRef.update(messageId, {
            estado: 2,
        });
    };
    HomePage.prototype.publico = function (messageId) {
        this.messageRef.update(messageId, {
            estado: 0,
        });
    };
    /*  showOptions(messageId, messageTitle) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'What do you want to do?',
          buttons: [
            {
              text: 'Delete Message',
              role: 'destructive',
              handler: () => {
                this.removeMessage(messageId);
              }
            }, {
              text: 'Update title',
              handler: () => {
                this.updateMessage(messageId, messageTitle);
              }
            }, {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionSheet.present();
      }
    
      removeMessage(messageId: string) {
        this.messageRef.remove(messageId);
      }
    
      updateMessage(messageId, messageTitle) {
        let prompt = this.alertCtrl.create({
          title: 'Message Name',
          message: "Update the name for this Message",
          inputs: [
            {
              name: 'title',
              placeholder: 'Title',
              value: messageTitle
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Save',
              handler: data => {
                this.messageRef.update(messageId, {
                  title: data.title, lastUpdatedBy: this.currentUser.uid
                });
              }
            }
          ]
        });
        prompt.present();
      }
    */
    HomePage.prototype.login = function () {
        var _this = this;
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].GoogleAuthProvider())
            .then(function (response) {
            console.log('resultado login google:', response);
            var userRef = _this.afDatabase.list('users');
            userRef.update(response.user.uid, {
                userId: response.user.uid,
                displayName: response.user.displayName,
                photoURL: response.user.photoURL,
            });
        });
    };
    HomePage.prototype.loginWithEmail = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_4_firebase_app__["auth"].EmailAuthProvider()).then(function (xx) {
        });
    };
    HomePage.prototype.logout = function () {
        this.afAuth.auth.signOut();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\luigy\Downloads\uxClass-master\uxClass-master\ionic\crudApp\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <ion-item class="item item-trns text-center">\n        <pre>The Social</pre>\n        <ion-avatar item-end *ngIf="afAuth.authState | async">\n          <img src={{currentUser.photoURL}}>\n        </ion-avatar>\n        <button *ngIf="afAuth.authState | async" ion-button color="primary" item-end (click)="logout()">Logout</button>\n      </ion-item>\n    </ion-title>\n  </ion-navbar>\n  <div *ngIf="afAuth.authState | async as user; else showLogin">\n    <ion-toolbar no-border-top>\n      <ion-segment [(ngModel)]="main">\n        <ion-segment-button value="Home">\n          Home\n        </ion-segment-button>\n       \n        <ion-segment-button value="Explorer">\n          Explorer\n        </ion-segment-button>\n      </ion-segment>\n    </ion-toolbar>\n  </div>\n</ion-header>\n\n\n\n<ion-content>\n  <div [ngSwitch]="main">\n\n    <ion-item *ngSwitchCase="\'Home\'">\n      <div *ngIf="afAuth.authState | async as user; ">\n\n        <ion-list>\n          <ion-item *ngFor="let message of messages | async" class="itemchat">\n              <div *ngIf="message.estado==2&&message.uid==currentUser.uid||message.estado==0">\n                  <ion-card>\n                    <ion-item>\n                      <ion-avatar item-start>\n                        <img src={{message.uPhoto}}>\n                      </ion-avatar>\n                      {{message.displayName}}\n                    </ion-item>\n                    <ion-card-content>\n                      {{message.title}}\n                    </ion-card-content>\n                    <ion-row>\n                      <ion-col>\n                        <button ion-button color="primary" clear small icon-start (click)="like(message.id,message.like,message.order)">\n                          <ion-icon name=\'thumbs-up\'></ion-icon>\n                          {{message.like}}\n                        </button>\n                      </ion-col>\n                      <ion-col>\n                        <button ion-button color="primary" clear small icon-start (click)="dislike(message.id,message.dislike)">\n                          <ion-icon name=\'thumbs-down\'></ion-icon>\n                          {{message.dislike}}\n                        </button>\n                      </ion-col>\n                      <ion-col align-self-center text-center>\n                        <button *ngIf="message.uid==currentUser.uid" ion-button color="primary" clear small icon-start (click)="privado(message.id)">\n                          privado\n                          <ion-icon name=\'eye-off\'></ion-icon>\n                        </button>\n                      </ion-col>\n                      <ion-col align-self-center text-center>\n                        <button *ngIf="message.uid==currentUser.uid" ion-button color="primary" clear small icon-start (click)="publico(message.id)">\n                          publico\n                          <ion-icon name=\'eye\'></ion-icon>\n                        </button>\n                      </ion-col>\n                    </ion-row>\n                  </ion-card>\n                </div>\n\n          </ion-item>\n        </ion-list>\n        <ion-toolbar position="bottom">\n          <ion-row class="message_row">\n            <ion-col col-9>\n              <ion-item no-lines>\n                <ion-label color="primary">Message</ion-label>\n                <ion-input type="text" placeholder="message" [(ngModel)]="message"></ion-input>\n              </ion-item>\n            </ion-col>\n            <ion-col col-3>\n              <div class="buttons" item-right>\n                <button ion-fab mini (click)="addMessage()" [disabled]="message === \'\'">\n                  <ion-icon name="send"></ion-icon>\n                </button>\n              </div>\n            </ion-col>\n          </ion-row>\n        </ion-toolbar>\n      </div>\n    </ion-item>\n\n    \n    <ion-list *ngSwitchCase="\'Explorer\'">\n      <ion-item>\n        <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n        <ion-list>\n          <ion-item *ngFor="let user of userlist">\n            {{ user.displayName }}\n            <button ion-button color="primary">FOLLOW</button>\n            <ion-avatar item-left>\n              <img src={{user.photoURL}}>\n            </ion-avatar>\n          </ion-item>\n        </ion-list>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n<ng-template #showLogin>\n  <p>Please login.</p>\n  <button ion-button color="danger" (click)="login()" icon-right>\n    <ion-icon name="logo-googleplus">Login with Google</ion-icon>\n  </button>\n</ng-template>\n\n<!--\n<ion-content padding>\n  <div *ngIf="afAuth.authState | async as user; else showLogin">\n    <div class="main">\n      <div class="chat">\n        <ion-list>\n          <ion-item *ngFor="let message of messages | async" (click)="showOptions(message.id, message.title)" class="itemchat">\n            {{message.title}}\n            <ion-avatar item-left>\n              <img src={{message.uPhoto}}>\n            </ion-avatar>\n          </ion-item>\n        </ion-list>\n        <ion-footer>\n          <ion-toolbar>\n            <ion-row class="message_row">\n              <ion-col col-9>\n                <ion-item no-lines>\n                  <ion-label color="primary">Message</ion-label>\n                  <ion-input type="text" placeholder="message" [(ngModel)]="message"></ion-input>\n                </ion-item>\n              </ion-col>\n              <ion-col col-3>\n                <div class="buttons" item-right>\n                  <button ion-fab mini (click)="addMessage()" [disabled]="message === \'\'">\n                    <ion-icon name="send"></ion-icon>\n                  </button>\n                </div>\n              </ion-col>\n            </ion-row>\n          </ion-toolbar>\n        </ion-footer>\n      </div>\n\n    </div>\n  </div>\n  <ng-template #showLogin>\n    <p>Please login.</p>\n    <button ion-button color="danger" (click)="login()" icon-right>\n      <ion-icon name="logo-googleplus">Login with Google</ion-icon>\n    </button>\n  </ng-template>\n</ion-content>\n-->'/*ion-inline-end:"C:\Users\luigy\Downloads\uxClass-master\uxClass-master\ionic\crudApp\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(302);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__ = __webpack_require__(279);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







// Import the AF2 Module



// AF2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyCqhIyS2XYCY26SbIk5Lk81l9ZkukqD3m4",
    authDomain: "test-de0b8.firebaseapp.com",
    databaseURL: "https://test-de0b8.firebaseio.com",
    projectId: "test-de0b8",
    storageBucket: "test-de0b8.appspot.com",
    messagingSenderId: "823465538611"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(230);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\luigy\Downloads\uxClass-master\uxClass-master\ionic\crudApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\luigy\Downloads\uxClass-master\uxClass-master\ionic\crudApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[281]);
//# sourceMappingURL=main.js.map