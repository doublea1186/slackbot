class TPProjectData{

    constructor(name, id){
        this.name = name;
        this.id = id;
    }

    static dataRecieved(){
        console.log('Project has been created and data has been received');
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
