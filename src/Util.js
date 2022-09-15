import { poses } from './poses';

export function rand(s, e) {
    return Math.floor((Math.random() * (e - s)) + s);
};

export function randomImage(photoset) {
    if (photoset === 0) {
        return poses[rand(0, poses.length-1)]
    }
};

export function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
};
