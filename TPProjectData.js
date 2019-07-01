class TPProjectData{

    constructor(name, id){
        this.name = name;
        this.id = id;
    }

    dataReceived() {
        console.log('Project has been created and data has been received \n Name: ' + this.name + "\n ID: " + this.id);
    }

    setName(name){
        this.name = name;
    }
    setID(id){
        this.id = id;
    }
    getName(){
        return this.name;
    }
    getID(){
        return this.id;
    }

}

module.exports = TPProjectData;
