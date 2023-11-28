class Auth {
    constructor(base_url) {
        this.base_url = base_url
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json()
        }
        throw new Error('error')
    }

    registerUser(email, password) {
        return fetch(`${this.base_url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password})
        })
        .then((res) => {
            this._checkResponse(res)
        })
    }

    authUser(email, password) {
        return fetch(`${this.base_url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({email, password})
        })
        .then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this.base_url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((res) => {
            this._checkResponse(res)
        })
    }
}

const auth = new Auth('https://auth.nomoreparties.co')
export default auth