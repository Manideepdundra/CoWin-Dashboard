import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {data} = props
  console.log(data)
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }
  return (
    <BarChart
      width={1000}
      height={300}
      data={data}
      margin={{
        top: 5,
      }}
    >
      <XAxis
        dataKey="vaccine_date"
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 0,
        }}
      />
      <Legend
        wrapperStyle={{
          padding: 30,
        }}
      />
      <Bar
        dataKey="dose_1"
        name="Dose 1"
        className="barStyle"
        fill="#2d87bb"
        barSize="20%"
      />
      <Bar
        dataKey="dose_2"
        name="Dose 2"
        className="barStyle"
        fill="#f54394"
        barSize="20%"
      />
    </BarChart>
  )
}

export default VaccinationCoverage
