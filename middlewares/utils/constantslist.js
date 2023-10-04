const PASSWORD_REGEX_PATTERN = /^(\S)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])[a-zA-Z0-9~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]{5,20}$/;
const EMAIL_REGEX_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const BIRTHDAY_REGEX_PATTERN = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
const POST_HTTP_METHOD = 'POST';
const PUT_HTTP_METHOD = 'PUT';
const CUSTOMER_ROLE = 0;
const SYSTEM_MANAGER_ROLE = 1;


module.exports = {
    PASSWORD_REGEX_PATTERN,
    EMAIL_REGEX_PATTERN,
    CUSTOMER_ROLE,
    SYSTEM_MANAGER_ROLE,
    BIRTHDAY_REGEX_PATTERN,
    POST_HTTP_METHOD,
    PUT_HTTP_METHOD
}