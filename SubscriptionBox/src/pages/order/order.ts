import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

// Import the AF2 Module
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})

export class OrderPage {

  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, db : AngularFireDatabase, public alertCtrl : AlertController, 
              public actionSheetCtrl: ActionSheetController) {
        this.items  = db.list('/items');
  }

  addItem() {
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Enter a name for this new item you're so keen on adding",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
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
            this.items.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(itemId, itemTitle) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Item',
          role: 'destructive',
          handler: () => {
            this.removeItem(itemId);
          }
        },{
          text: 'Update title',
          handler: () => {
            this.updateItem(itemId, itemTitle);
          }
        },{
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

  removeItem(itemId: string) {
    this.items.remove(itemId);
  }

  updateItem(itemId, itemTitle) {
    let prompt = this.alertCtrl.create({
      title: 'Item Name',
      message: "Update the name for this item",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: itemTitle
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
            this.items.update(itemId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }
}