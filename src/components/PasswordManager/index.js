import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordsList: [],
    isShowPassword: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const filterPasswordList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filterPasswordList})
  }

  getFilteredSearchResults = () => {
    const {passwordsList, searchInput} = this.state

    const filteredSearchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filteredSearchResults
  }

  onAddPassword = event => {
    event.preventDefault()
    const initialProfileColors = [
      '#7683cb',
      '#f59e0b',
      '#10b981',
      '#f97316',
      '#14b8a6',
      '#b91c1c',
      '#0ea5e9',
    ]

    const randomIndex = Math.floor(
      Math.random() * initialProfileColors.length - 1,
    )
    console.log(Math.random() * initialProfileColors.length - 1)
    const profileBgColor = initialProfileColors[randomIndex]
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      profileBgColor,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onToggleCheckbox = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      searchInput,
      passwordsList,
      isShowPassword,
    } = this.state
    const searchResults = this.getFilteredSearchResults()

    return (
      <div className="app-container">
        <div className="password-manager-responsive">
          <div className="password-manager-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
            <div className="password-manager-top-card-container">
              <div className="password-manager-content-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                  alt="password manager"
                  className="password-manager-sm-image"
                />
                <div className="password-manager-inputs-card-container">
                  <form
                    className="form-container"
                    onSubmit={this.onAddPassword}
                  >
                    <h1 className="form-heading">Add New Password</h1>
                    <div className="input-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                        alt="website"
                        className="input-icon"
                      />
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter Website"
                        onChange={this.onChangeWebsiteInput}
                        value={websiteInput}
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                        alt="username"
                        className="input-icon"
                      />
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter Username"
                        onChange={this.onChangeUsernameInput}
                        value={usernameInput}
                      />
                    </div>
                    <div className="input-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                        alt="password"
                        className="input-icon"
                      />
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter Password"
                        onChange={this.onChangePasswordInput}
                        value={passwordInput}
                      />
                    </div>
                    <button type="submit" className="add-button">
                      Add
                    </button>
                  </form>
                </div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                  alt="password manager"
                  className="password-manager-lg-image"
                />
              </div>
            </div>
            <div className="password-manager-bottom-card-container">
              <div className="password-manager-password-container">
                <div className="password-label-and-input-container">
                  <div className="your-passwords-container">
                    <h1 className="your-passwords-text">Your Passwords</h1>
                    <p className="passwords-count">{passwordsList.length}</p>
                  </div>
                  <div className="search-input-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="search-icon"
                    />
                    <input
                      type="search"
                      className="search-input"
                      placeholder="Search"
                      onChange={this.onChangeSearchInput}
                      value={searchInput}
                    />
                  </div>
                </div>
                <hr className="line" />
                <div className="label-and-checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxId"
                    className="input-checkbox"
                    onChange={this.onToggleCheckbox}
                  />
                  <label htmlFor="checkboxId" className="label-text">
                    Show Passwords
                  </label>
                </div>
                {searchResults.length !== 0 ? (
                  <ul className="passwords-list-container">
                    {searchResults.map(eachPassword => (
                      <PasswordItem
                        key={eachPassword.id}
                        passwordDetails={eachPassword}
                        deletePassword={this.deletePassword}
                        isShowPassword={isShowPassword}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="no-password-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                      alt="no passwords"
                      className="no-password-image"
                    />
                    <p className="no-password-text">No Passwords</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
