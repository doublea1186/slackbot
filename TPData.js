class TPData {
     // user_name;
     // user_id;
     // user_email;
     // slack_id;


    constructor() {
        this.user_name = '';
        this.user_id = '';
        this.user_email = '';
        this.slack_id = '';
    }

    user_created(){ //function that gets alerted when a new Target Process user is made
        console.log('New Target Process user made');
    }

    getTPData() {
        //function that, once alerted, gets the Target Process user name, id, and email
        console.log('data has been recieved \n name: ' + this.user_name + ' \n user_id: ' + this.user_id + '\n user email: ' + this.user_email);
    }

    getName(){
        return this.user_name;
    }
    getID(){
        return this.user_id;
    }
    getEmail(){
        return this.user_email;
    }
    getSlackID(){
        return this.user_email;
    }
    setName(name){
        this.name = name;
    }
    setID(ID){
        this.user_id = ID;
    }
    setEmail(email){
        this.user_email = email;
    }
    setSlackID(slackID){
        this.slack_id = slackID;
    }
}

module.exports = TPData;
