function validateName(name: string): boolean {
    const nameRegex = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
    return nameRegex.test(name);
}

function validateLogin(login: string): boolean {
    const loginRegex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
    return loginRegex.test(login);
}

function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
    return passwordRegex.test(password);
}

function validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
}

function validateMessage(message: string): boolean {
    return message.trim().length > 0;
}

export { validateName, validateLogin, validatePhone, validateEmail, validatePassword, validateMessage };