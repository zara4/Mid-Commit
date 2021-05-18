import firebase from "firebase";

class Fire {

    Constructor() {
        this.init();
        this.checkAuth()
    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyDp48jRaC7z8wGIQgsf79xgAbe95MGfzYs",
                authDomain: "naiki-b125a.firebaseapp.com",
                databaseURL: "https://naiki-b125a-default-rtdb.firebaseio.com",
                projectId: "naiki-b125a",
                storageBucket: "naiki-b125a.appspot.com",
                messagingSenderId: "801406744708",
                appId: "1:801406744708:web:cb16690ad33801f06e2ad1",
                measurementId: "G-M9W4N24FJ5"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        })
    }

    parse = message => {
        const { user, text, timestamp } = message.val()
        const { key: _id } = message
        const createAt = new Date(timestamp);

        return {
            _id,
            createAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', shapshot => callback(this.parse(shapshot)));
    }

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

}

export default new Fire();