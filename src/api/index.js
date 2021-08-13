import axios from 'axios'
// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
// var options = {
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//   },
//   headers: {
//     'x-rapidapi-key': '49e9938d9fmsh777a9ec4c6b2df5p1701aajsn50478efd5976',
//     'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
//   }
// };

export const getPlacesData = async ( type, sw, ne) => {
  try {
    // const {data: {data}} = await axios.get(URL, options)
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-key': '49e9938d9fmsh777a9ec4c6b2df5p1701aajsn50478efd5976',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}