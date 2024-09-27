export const getPasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (password.match(/[a-z]/)) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[\W_]/)) strength += 1;

    return strength;
};