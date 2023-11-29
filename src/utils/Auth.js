class Auth {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    _checkResponse(res) {
        if(res.ok) {
            return res.json()
        }
        throw new Error('error')
    }

    registerUser(email, password) {
        return fetch(`${this.baseUrl}/signup`, {
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
          return this._checkResponse(res)
        })
    }

    authUser(email, password) {
        return fetch(`${this.baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify({email, password})
        })
        .then(this._checkResponse)
    }

    checkToken(token) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        })
        .then((res) => {
          return this._checkResponse(res)
        })
    }
}

const auth = new Auth('https://auth.nomoreparties.co')
export default auth