
export function rand(s, e) {
    return Math.floor((Math.random() * (e - s)) + s);
};

export function randomImage() {
    var which = rand(1, 7),
        file = "",
        max = 1;
    if (which === 1) {
        file = "Chanon_Large\\Chanon";
        max = 313;
    }
    if (which === 2) {
        file = "Aaron_Large\\Aaron";
        max = 325;
    }
    if (which === 3) {
        file = "Marcia_Large\\Marcia";
        max = 226;
    }
    if (which === 4) {
        file = "Veronica_Large\\Veronica";
        max = 433;
    }
    if (which === 5) {
        file = "Yoni_Large\\Yoni";
        max = 306;
    }
    if (which === 6) {
        file = "Mallory_Large\\Mallory-";
        max = 158;
    }
    return file + pad(rand(1, max), 3) + ".jpg";
};

export function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};
