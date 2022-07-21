import { ValueNotNull } from "../helper"
const LOCAL_STORAGE_KEY_USERS = "users";

export const getAllUsers = () => {
    const retrieveusers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS));
    return retrieveusers;
}

export const saveUser = (user) => {
    try {

        const retrieveusers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS));

        if (retrieveusers) {
            var newUserCollection = [...retrieveusers, user];
            localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(newUserCollection));
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify([...[], user]));
        }

        return true;

    } catch (err) {
        console.log("Error throwing from save users", err);
        return false;
    }
}

export const DeleteUser = (id) => {

    try {
        const retrieveusers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS));
        if (retrieveusers) {
            let filteredUsers = retrieveusers.filter(x => x.id != id);
            SaveAllUser(filteredUsers);

            return true;
        }
        return false;
    }
    catch (err) {
        console.log("delete user", err);
        return false;
    }

}

export const UpdateUser = (user) => {
    try {
        if (user) {
            const allUsers = getAllUsers()
            if (allUsers) {
                let updatedList=allUsers.map(obj => {
                    if (obj.id == user.id) {
                        obj = user;
                    }

                    return obj
                })
                SaveAllUser(updatedList);
                return true;
            }
        }
    }
    catch (error) {
        console.log("update user triggered error", error)
        return false;
    }
}


//This will replace all existing users with the passing users
export const SaveAllUser = (users) => {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users));
}

