var FirebaseLog = (function() {
    var refValue = null;

    if (typeof firebase === "undefined") {
        console.error("firebase.js required");
        return;
    }

    function log(text, key) {
        //key condition
        if (typeof key === "undefined" && refValue) {
            key = refValue;
        } else if (typeof key === "undefined" && !refValue) {
            refValue = getToken(6, true);
            key = refValue;
        }

        firebase.database().ref(key + "/" + getTime()).set(text)
            .catch(function(error) {
                console.error("error:", error);
            });
    }

    function remove(key) {
        firebase.database().ref(key).remove()
            .catch(function(error) {
                console.error("error:", error);
            });
    }

    //=== get key from this time ===
    function getTime() {
        var date = new Date();
        var currentTime = "" + date.getFullYear() +
            timeFormate(date.getMonth() + 1) +
            timeFormate(date.getDate()) +
            "-" +
            timeFormate(date.getHours()) +
            timeFormate(date.getMinutes()) +
            timeFormate(date.getSeconds());
        //private method
        function timeFormate(value) {
            if (value < 10) {
                return "0" + value;
            } else {
                return value;
            }
        }
        return currentTime;
    }

    //=== 產生隨機token ===
    function getToken(number, upperCase) {
        var string = "abcdefghijklmnopqrstuvwxyz";
        var token = "";
        var getChar = "";
        var index;
        var upRandom;
        for (var i = 0; i < number; i++) {
            index = Math.floor((Math.random() * string.length) + 1);
            getChar = string.charAt(index - 1);
            if (upperCase) {
                upRandom = Math.round(Math.random());
                if (upRandom) {
                    getChar = getChar.toUpperCase();
                }
            }
            token += getChar;
        }
        return token;
    }


    //=== API ===
    return {
        "log": log,
        "remove": remove
    }
})();

//Test
/*
FirebaseLog.log("text1", "A01");
setTimeout(function() {
    FirebaseLog.remove("A01");
}, 5000);
*/
