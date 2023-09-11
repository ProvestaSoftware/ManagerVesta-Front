export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('accessToken');
    let language = user?.language ?? localStorage.getItem('language') ?? 'fr';

    if (token) {
        return {
            'Authorization': 'Bearer ' + token,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': language ?? 'fr',
        };
    } else {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': language ?? 'fr',
        };
    }
}

export function guestHeader() {
    let language = localStorage.getItem('language') ?? 'fr';
    
    return {
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': language??'fr',
    };
}