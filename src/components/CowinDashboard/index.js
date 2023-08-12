import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

class CowinDashboard extends Component {
  state = {data: [], isLoaded: true, view: false}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()

    console.log(response)

    const modifiedData = {
      last7DaysVaccination: data.last_7_days_vaccination,
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    this.setState({data: modifiedData})

    if (response !== undefined) {
      this.setState({isLoaded: false})
    } else {
      this.setState({isLoaded: false, view: true})
    }
  }

  renderData = () => {
    const {data, view} = this.state
    if (view === false) {
      return (
        <div>
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage data={data.last7DaysVaccination} />
          <h1>Vaccination by Age</h1>
          <VaccinationByAge data={data.vaccinationByAge} />
          <h1>Vaccination by gender</h1>
          <VaccinationByGender data={data.vaccinationByGender} />
        </div>
      )
    }
    return (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1>Something went wrong</h1>
      </>
    )
  }

  render() {
    const {isLoaded} = this.state
    return (
      <div className="covinContainer">
        <div className="covin-card">
          <div className="website-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="img"
            />
            <h1 className="co-win">Co-Win</h1>
          </div>
          <h1>CoWin Vaccination in India</h1>
          {isLoaded ? (
            <div data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
            </div>
          ) : (
            this.renderData()
          )}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
