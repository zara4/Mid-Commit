import * as firebase from 'firebase'
import database from '@react-native-firebase/database';

function adduser(name,uid,cnic,email,gender,country,city,phone,userImg,password){
 try{
   firebase.database()
  .ref('/donor/'+uid)
  .set({
         name:name,
        uid:uid,
        cnic:cnic,
        email:email,
        gender:gender,
        city:city,
        country:country,
        phone:phone,
        userImg:userImg,
        password:password
  })
    }catch(error){
      console.log(error)
    }
}
export default adduser();
  