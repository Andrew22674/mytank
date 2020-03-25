const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);
//admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
exports.addToUserPosts = functions.database.ref('/messages/{pushId}')
    .onWrite((change, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = change.after.val();
      console.log("adding post ");



     const tipoAcceso = original.acceso;
     const postID = original.idMensaje;
     const userID = original.userId;

      //add post to user posts
      var userposts = admin.database().ref().child("user-posts/" + userID + "/" + tipoAcceso + "/" +  postID);

      return userposts.update(original);
    });*/

    exports.updateDate = functions.database.ref('/Stats/Nivel')
        .onWrite((change, context) =>{
            const nivel = change.after.val();
            console.log(nivel);
            //console.log("time: " + firebase.database.ServerValue.TIMESTAMP);
            if(nivel === 100){
                console.log("true");
                //return admin.database().ref().child("Stats/fulldate").set(firebase.database.ServerValue.TIMESTAMP);
                //return admin.database().ref().child("Stats/fulldate").set(new Date());
                //aqui hay que set la fecha del servidor
                return admin.database().ref().child("Stats/fulldate").set(90);
            }else{
                return true;
            }
            
        });

