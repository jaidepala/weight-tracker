/* 
    !   How To Create Service
    *   
    *   REF
    *   https://stackoverflow.com/a/52924068
*/

export class Utils {

    static isLoggedIn = () => {

        return localStorage.getItem('user') && localStorage.getItem('user') != null;
    };

    static setLoggedInUser = ( userData ) => {
        localStorage.setItem('user', userData.id);
    };
};