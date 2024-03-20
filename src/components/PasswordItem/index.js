import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isShowPassword, deletePassword} = props
  const {id, website, username, password, profileBgColor} = passwordDetails

  const initial = website ? website[0].toUpperCase() : ''

  const passwordPattern = isShowPassword ? (
    <p className="list-item">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-icon"
    />
  )

  const onDeletePassword = () => {
    deletePassword(id)
  }
  return (
    <li className="password-item-container">
      <div className="password-details">
        <div className="profile-container" style={{background: profileBgColor}}>
          {initial}
        </div>

        <div className="user-details-container">
          <p className="list-item">{website}</p>
          <p className="list-item">{username}</p>
          {passwordPattern}
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={onDeletePassword}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
