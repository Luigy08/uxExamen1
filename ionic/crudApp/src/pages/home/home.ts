import { Component } from '@angular/core';
import {
  NavController,
  AlertController, // To Add Button
  ActionSheetController // To delete
} from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from '@firebase/util';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  currentUser: any;
  messageRef: any;
  messages: AngularFireList<any>;
  message = '';
  users: AngularFireList<any>;
  userRef: any;
  user: any;
  public userlist: Array<any>;
  public loadeduserlist: Array<any>;
  public countryRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController, public afDatabase: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.messageRef = afDatabase.list('messages', ref => ref.orderByChild('order'));
    this.messages = this.messageRef.valueChanges();
    this.userRef = afDatabase.list('users');
    this.users = this.userRef.valueChanges();
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.currentUser = null;
        return;
      }
      this.currentUser = { uid: user.uid, photoURL: user.photoURL, displayName: user.displayName };
      this.countryRef = firebase.database().ref('/users');
      this.countryRef.on('value', userlist => {
        let usuarios = [];
        userlist.forEach(usuario => {
          usuarios.push(usuario.val());
          return false;
        });

        this.userlist = usuarios;
        this.loadeduserlist = usuarios;
      });
    });
  }
  initializeItems(): void {
    this.userlist = this.loadeduserlist;
  }
  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.userlist = this.userlist.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  like(id, likes, orders) {
    this.messageRef.update(id, {
      like: likes + 1,
      order: orders - 1
    });
  }
  dislike(id, dislikes) {
    this.messageRef.update(id, {
      dislike: dislikes + 1,
    });
  }
  addMessage() {
    const newMessageRef = this.messageRef.push({});
    newMessageRef.set({
      id: newMessageRef.key,
      title: this.message,
      like: 0,
      dislike: 0,
      order: 0,
      uid: this.currentUser.uid,
      uPhoto: this.currentUser.photoURL,
      displayName: this.currentUser.displayName,
      estado:0
    });
    this.message = '';
  }
  privado(messageId) {
    this.messageRef.update(messageId, {
      estado:2,
    });
  }
  publico(messageId) {
    this.messageRef.update(messageId, {
      estado:0,
    });
  }
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

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        console.log('resultado login google:', response);

        const userRef = this.afDatabase.list('users');

        userRef.update(response.user.uid,
          {
            userId: response.user.uid,
            displayName: response.user.displayName,
            photoURL: response.user.photoURL,


          });


      });
  }
  loginWithEmail() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.EmailAuthProvider()).then((xx) => {

    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
