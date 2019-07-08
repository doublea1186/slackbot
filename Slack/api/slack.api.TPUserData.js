export default class TPUserData {

    constructor(name, email, id) {
        this.user_name = name;
        this.user_id = id;
        this.user_email = email;
    }

    user_created() { //function that gets alerted when a new Target Process user is made
        console.log('New Target Process user made');
    }

    getTPData() {
        //function that, once alerted, gets the Target Process user name, id, and email
        console.log('data has been recieved \n name: ' + this.user_name + ' \n user_id: ' + this.user_id + '\n user email: ' + this.user_email);
    }

    getName() {
        return this.user_name;
    }

    getID() {
        return this.user_id;
    }

    getEmail() {
        return this.user_email;
    }

    getSlackID() {
        return this.user_email;
    }

    setName(name){
        this.name = name;
    }

    setID(ID) {
        this.user_id = ID;
    }

    setEmail(email) {
        this.user_email = email;
    }

    setSlackID(slackID) {
        this.slack_id = slackID;
    }

}

