import {useState} from 'react';
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e => {

  }

  const onSubmit = e => {
    e.preventDefault()
  }
    return (
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Forgot Password</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className="emailInput" placeholder='Email' id='email' value={email} onChange={onChange} />
            <Link className='forgotPasswordLink' to='/sign-in'>Sign In</Link>
          </form>
        </main>
      </div>
    )
  }
  export default ForgotPassword