import moment from 'moment'

export default {
  name: 'datetime',
  filter: value => {
    return moment(value).format('DD/MM/YYYY HH:mm')
  }
}
