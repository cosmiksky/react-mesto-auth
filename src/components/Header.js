import logo from '../images/logo.svg';
import {Link, Routes, Route} from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип Место" />
          <Routes>
            <Route path='/sign-up' element={<Link to='/sign-in' className='header__link'>Войти</Link>}/>
            <Route path='/sign-in' element={<Link to='/sign-up' className='header__link'>Регистрация</Link>}/>
            <Route path='/' element={
              <div className='header__container'>
                <p className='header__email'>{props.email}</p>
                <Link to='sign-in' className='header__link' onClick={props.onLogout}>Выйти</Link>
              </div>
              }/>
          </Routes>
        </header>
    )
}
export default Header;