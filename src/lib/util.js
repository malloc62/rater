const EXTENSION_MAP = {
    'png': 'img',
    'jpg': 'img',
    'jpeg': 'img',
    'gif': 'img',
    'svg': 'img', 
    'mp4': 'video'
}

let checkLength = function(string, field, lowerBound, upperBound) {
    if (string.length < lowerBound) {
        if (string.length == 0) {
            return { success: `${field} cannot be blank.` }
        }
        return { success: `${field} is too short (minimum length: ${lowerBound} characters).` }
    }

    if (string.length > upperBound) {
        return { success: `${field} is too long (maximum length: ${upperBound} characters).` }
    }

    return false;
}

let checkRegex = function(string, field, regex) {
    if (string.search(regex) != -1) {
        return { success: `${field} contains illegal characters.` }
    }
    return false;
}

let handleSubmitGet = async e => {
    const ACTION_URL = e.target.action

    const formData = new FormData(e.target);
    const asString = new URLSearchParams(formData).toString();    

    return await fetch(ACTION_URL + '?' + asString, {
        method: 'GET',
    }).then(x => x.text());
}

let handleSubmit = async e => {
    const ACTION_URL = e.target.action

    const formData = new FormData(e.target);
        
    return await fetch(ACTION_URL, {
        method: 'POST',
        body: formData
    }).then(x => x.text());
}

let safeName = function (text) {
    return text.replaceAll(/[^A-Za-z0-9\-\_]/g, '');
}

let block = function(bool) {
    return (bool) ? 'block' : 'inline';
}

let safePath = function(path) {
    if (path == '..' || path == '.') return '';
    return path.replace(/[\/]+/g, '')
}

let setLocation = function(location, key, value) {
    var loc = new URL(location).searchParams;

    loc.set(key,value);
    return loc.toString();
}

let user = 'derv';

export {
    checkLength,
    checkRegex,
    handleSubmit,
    handleSubmitGet,
    block,
    safePath,
    setLocation,
    user
};