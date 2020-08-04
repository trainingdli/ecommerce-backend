const getErrors = (error) => {
    let errorArray = [];
    if (error) {
        if (error.errors['code']) {
            errorArray.push(error.errors['code']['properties']['message']);
        } 
        if (error.errors['price']) {
            errorArray.push(error.errors['price']['properties']['message']);
        }
        if (error.errors['category']) {
            errorArray.push(error.errors['category']['properties']['message']);
        }
        if (error.errors['firstname']) {
            errorArray.push(error.errors['firstname']['properties']['message']);
        } 
        if (error.errors['lastname']) {
            errorArray.push(error.errors['lastname']['properties']['message']);
        }
        if (error.errors['phoneNo']) {
            errorArray.push(error.errors['phoneNo']['properties']['message']);
        }
        if (error.errors['password']) {
            errorArray.push(error.errors['password']['properties']['message']);
        }
        if (error.errors['username']) {
            errorArray.push(error.errors['username']['properties']['message']);
        }
    }
    if (errorArray.length === 0) {
        return error;
    }
    return errorArray;
}

module.exports = getErrors;
// {
//     errors: {
//         code: {
//             properties: {
//                 message: ''
//             }
//         }
//     }
// }