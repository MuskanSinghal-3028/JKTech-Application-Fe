

export const getUserName = () => {
    const token = localStorage.getItem('access_token');
    let name = '';
    let email = '';
    if (token && token != 'undefined') {
        const parsed_token = JSON.parse(atob(token.split('.')[1]));
        name = parsed_token?.firstName;
        email = parsed_token?.email
    }
    return {name, email};
};

