const data = require('../MOCK_DATA.json');
const fs = require('fs');
const { userInfo } = require('os');
const jsonPath = './MOCK_DATA.json';

module.exports = {

    getUsers: () => {
        return data;
    },

    createUser : (dataUser) => {
        let newUser = {
            id: data.length + 1,
            ...dataUser,
        };

        data.push(newUser);

        return newUser;
    },


    updateUser : (id, userInfo) => {

        let users = data;
        let index = users.findIndex(x => x.id == id);
        users[index].email = userInfo.email;
        users[index].first_name = userInfo.first_name;
        users[index].last_name = userInfo.last_name;
        fs.writeFile(jsonPath, JSON.stringify(users), function(err){
            if(err) throw err;

            console.log('complete');
        })
    },

    deleteUser : (id) => {

        let index = data.findIndex(x => x.id == id);
        if(index > -1)
        {
        data.splice(index, 1);

        fs.writeFile(jsonPath, JSON.stringify(data), function(err){
            if(err) throw err;

            console.log('complete');
        })
        }

 
    },

    getUserById : (id) => {
        
        let user = data.find((users) => users.id == id);

        return user;
    }

};
