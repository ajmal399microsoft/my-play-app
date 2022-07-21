
const LOCAL_STORAGE_KEY_PLAYS = "plays";

export const getAllPlayInformation = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PLAYS));
}

export const savePlayInformation = (play) => {
    try {

        const retrievePlays = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_PLAYS));

        if (retrievePlays) {
            SaveAllPlay([...retrievePlays, play]);
        } else {
            SaveAllPlay([...[], play]);
        }

        return true;

    } catch (err) {
        console.log("Error throwing from save play information", err);
        return false;
    }
}

export const DeletePlay = (id) => {
    try {
        let plays = getAllPlayInformation();
        if (plays) {
            let filteredPlays = plays.filter(x => x.id != id);
            SaveAllPlay(filteredPlays);
            return true;
        }
        return false;
    }
    catch (error) {
        console.log("Error happened in delete play information", error);
        return false;
    }
}

export const SaveAllPlay = (plays) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY_PLAYS, JSON.stringify(plays));
        return true;
    } catch (error) {
        console.log("Save all play information :", error)
        return false;
    }
}